-- sqlcmd -S Desktop-VEL135S\ges -i C:\setup_school_db.sql -o C:\setup_school_db.sql.log

use master;
go

drop database if exists school;
go

create database [school] on primary (
    name="school_primary",
    filename="c:\data\db\school\school_primary.mdf",
    size=4MB,
    maxsize=100MB,
    filegrowth=1MB
), filegroup fg_school_default (
    name="school_data_fg_default",
    filename="c:\data\db\school\school_data_fg_default.ndf"
), filegroup fg_school_zip (
    name="school_data_fg_zip",
    filename="c:\data\db\school\school_data_fg_zip.ndf"
), filegroup fg_school_student (
    name="school_data_fg_student",
    filename="c:\data\db\school\school_data_fg_student.ndf"
), filegroup fg_school_teacher (
    name="school_data_fg_teacher",
    filename="c:\data\db\school\school_data_fg_teacher.ndf"
), filegroup fg_school_class (
    name="school_data_fg_class",
    filename="c:\data\db\school\school_data_fg_class.ndf"
), filegroup fg_school_class_teacher_junction (
    name="school_data_fg_class_teacher_junction",
    filename="c:\data\db\school\school_data_fg_class_teacher_junction.ndf"
) log on (
    name="school_log",
    filename="c:\data\db\school\school_log.ldf",
    size=1MB,
    maxsize=100MB,
    filegrowth=1MB
) collate Latin1_General_100_CS_AS_SC;
go

alter database school set recovery full;
alter database school set multi_user;
go

use school;
create table zip (
    code int not null check (code >= 1000 and code <= 9999),
    region varchar(1024) not null,
) on fg_school_zip;

create table class (
    id uniqueidentifier default newid() not null,
    name varchar(1024) not null,
) on fg_school_class;

create table student (
    id uniqueidentifier default newid() not null,
    given_name varchar(2048) not null,
    surname varchar(1024) not null,
    address varchar(1024) default 'Not available',
    zip_code int not null,
    class_id uniqueidentifier not null,
) on fg_school_student;

create table teacher (
    id uniqueidentifier default newid() not null,
    given_name varchar(2048) not null,
    surname varchar(1024) not null,
    address varchar(1024) default 'Not available',
    zip_code int not null,
    class_id uniqueidentifier not null,
) on fg_school_teacher;

create table class_teacher_junction (
    id uniqueidentifier default newid() not null,
    teacher_id uniqueidentifier not null,
    class_id uniqueidentifier not null,
) on fg_school_class_teacher_junction;
go

alter table class
    add constraint pk_class primary key nonclustered (id);

alter table zip
    add constraint pk_zip primary key (code);

alter table student
    add constraint pk_student primary key nonclustered (id);
alter table student
    add constraint fk_student_zip foreign key (zip_code)
        references zip (code);
alter table student
    add constraint fk_student_class foreign key (class_id)
        references class (id);

alter table teacher
    add constraint pk_teacher primary key nonclustered (id);
alter table teacher
    add constraint fk_teacher_zip foreign key (zip_code)
        references zip (code);
alter table teacher
    add constraint fk_teacher_student_junction foreign key (class_id)
        references class (id);

alter table class_teacher_junction
    add constraint pk_class_teacher_junction primary key nonclustered (id);
alter table class_teacher_junction
    add constraint fk_class_teacher_junction_teacher foreign key (teacher_id)
        references teacher (id);
alter table class_teacher_junction
    add constraint fk_class_teacher_junction_class foreign key (class_id)
        references class (id);

alter database skoledb set recovery bulk_logged;
bulk insert school.dbo.zip_code
    from "C:\data\bulk\zip_codes.txt"
    with (
        codepage = 'ACP',
        batchsize = 250,
        datafiletype = 'char',
        fieldterminator = ',',
        rowterminator = '\n',
        maxerrors = 1,
        tablock
    )
alter database school set recovery full;

select * from school.dbo.zip;
