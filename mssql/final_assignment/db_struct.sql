-- AUTHOR: Andreas Krühlmann <echo 'YW5kcmVhc0BrcnVobG1hbm4uZGV2Cg==' | base64 -d>
-- LICENSE: GPL-3.0-or-later

use master;
go

drop database if exists customer_repository;
go

create database customer_repository on primary (
    name='customer_repository_primary',
    filename='c:\data\db\customer_repository\customer_repository_primary.mdf',
    size=4MB,
    maxsize=100MB,
    filegrowth=1MB
), filegroup fg_customer_repository_default (
    name='fg_default',
    filename='c:\data\db\customer_repository\fg_default.ndf'
), filegroup fg_zip (
    name='fg_zip',
    filename='c:\data\db\customer_repository\fg_zip.ndf'
), filegroup fg_contact_types (
    name='fg_constact_types',
    filename='c:\data\db\customer_repository\fg_contact_types.ndf'
), filegroup fg_contact_personel (
    name='fg_contact_personel',
    filename='c:\data\db\customer_repository\fg_contact_personel.ndf'
), filegroup fg_customers (
    name='fg_customers',
    filename='c:\data\db\customer_repository\fg_customers.ndf'
), filegroup fg_contacts (
    name='fg_contacts',
    filename='c:\data\db\customer_repository\fg_contacts.ndf'
) log on (
    name='customer_repository_log',
    filename='c:\data\db\customer_repository\log.ldf',
    size=1MB,
    maxsize=100MB,
    filegrowth=1MB
) collate LATIN1_GENERAL_100_CI_AS_SC_UTF8;
go

alter database customer_repository set recovery full;
alter database customer_repository set multi_user;
go

use customer_repository;
create table zip (
    code int not null check (code >= 1000 and code <= 9999),
    city varchar(256) not null,
) on fg_zip;

create table contact_types (
    id uniqueidentifier default newid() not null,
    type char(2) not null,
    name varchar(256) not null,
) on fg_contact_types;

create table contact_personel (
    id uniqueidentifier default newid() not null,
    initials char(2) not null,
    name varchar(256) not null, 
) on fg_contact_personel;

create table customers (
    id uniqueidentifier default newid() not null,
    company_name varchar(256) not null,
    address varchar(512) not null,
    email varchar(512),
    zip_code int not null check (zip_code >= 1000 and zip_code <= 9999),
) on fg_customers;

create table contacts (
    id uniqueidentifier default newid() not null,
    ts datetime not null,
    point_of_contact varchar(256) not null,
    reference varchar(4096) not null,
    customer_id uniqueidentifier not null,
    contact_type_id uniqueidentifier not null,
    contact_personel_id uniqueidentifier not null,
) on fg_contacts;
go

alter table zip
    add constraint pk_zip primary key (code);
alter table zip
    add constraint uq_zip_code unique (city);

alter table contact_types
    add constraint pk_contact_types primary key (id);

alter table contact_personel
    add constraint pk_contact_personel primary key (id);
alter table contact_personel
    add constraint uq_contact_personel_initials unique (initials)

alter table customers
    add constraint pk_customers primary key (id)
alter table customers
    add constraint fk_customers_zip foreign key (zip_code)
        references zip (code);

alter table contacts
    add constraint pk_contacts primary key (id)
alter table contacts
    add constraint fk_contacts_customer foreign key (customer_id)
        references customers (id)
alter table contacts
    add constraint fk_contacts_contact_type foreign key (contact_type_id)
        references contact_types (id)
alter table contacts
    add constraint fk_contacts_contact_personel
        foreign key (contact_personel_id)
        references contact_personel (id);

create index contact_idx on contacts (ts);
go

create view contacts_joined as
    select 
        contact.ts,
        contact.id,
        contact.reference,
        contact.point_of_contact,
        customer.company_name as company,
        customer.email as email,
        ctype.name as contact_type,
        personel.name as personel_name,
        personel.initials as personel_initials
    from contacts contact
    join customers customer on contact.customer_id = customer.id
    join contact_types ctype on contact.contact_type_id = ctype.id
    join contact_personel personel on contact.contact_personel_id = personel.id;
go

create login [customer_repo_selecter] with password = 'password';
create login [customer_repo_inserter] with password = 'password';

create user [customer_repo_selecter] for login [customer_repo_selecter];
create user [customer_repo_inserter] for login [customer_repo_inserter];

grant select on schema::dbo to [customer_repo_selecter];
grant insert on schema::dbo to [customer_repo_inserter];
go;
