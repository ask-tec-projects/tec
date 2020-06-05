use customer_repository;
go

insert into zip (code, city) values 
    (8000, N'Aarhus C'),
    (8660, N'Skanderborg'),
    (9000, N'Aalborg'),
    (6760, N'Ribe'),
    (3700, N'Rønne'),
    (6800, N'Varse');

insert into contact_types (type, name) values
    (N'BO', N'Brev fra os'),
    (N'KA', N'Kampagne'),
    (N'TK', N'Telefon fra kunden'),
    (N'TO', N'Telefon fra os');

insert into contact_personel (initials, name) values
    (N'AB', N'Anne Bendix'),
    (N'HH', N'Hanne Hansen'),
    (N'MJ', N'Max Jensen');

insert into customers (company_name, address, zip_code, email) values
    (N'D.K.G', N'Åbyvej 27', 8000, N'info@dkg.dk'),
    (N'Unikom', N'Vibyvej 104', 8660, N'dk@unikom.com'),
    (N'Hammer-holdt', N'Adelgade 1', 9000, N'hr@hholding.com'),
    (N'Jydsk Is', N'Brovej 9', 6760, N'mail@jydskis.dk'),
    (N'Anker Juul', N'Midtvej 8', 6800, NULL),
    (N'Rønne Vand', N'Havvej 43', 3700, N'rv@vandland.dk');

insert into contacts (
    ts,
    point_of_contact,
    reference,
    customer_id,
    contact_type_id,
    contact_personel_id
) values
    (
        convert(datetime, N'05-03-95 11:05', 5),
        N'Jørn Fick',
        N'Kunden kont',
        (select id from customers where email = N'info@dkg.dk'),
        (select id from contact_types where type = N'TO'),
        (select id from contact_personel where initials = N'AB')
    ),
    (
        convert(datetime, N'09-03-95 09:45', 5),
        N'Jørn Fick',
        N'De ønsker',
        (select id from customers where email = N'info@dkg.dk'),
        (select id from contact_types where type = N'TO'),
        (select id from contact_personel where initials = N'MJ')
    ),
    (
        convert(datetime, N'07-03-95 14:45', 5),
        N'Anne Madsen',
        N'Bestilt 3 PO',
        (select id from customers where email = N'dk@unikom.com'),
        (select id from contact_types where type = N'TK'),
        (select id from contact_personel where initials = N'AB')
    ),
    (
        convert(datetime, N'12-03-95', 5),
        N'Kurt Tanders',
        N'Kontakt',
        (select id from customers where email = N'hr@hholding.com'),
        (select id from contact_types where type = N'BO'),
        (select id from contact_personel where initials = N'MJ')
    ),
    (
        convert(datetime, N'21-05-95 15:05', 5),
        N'Niels Hansen',
        N'Manglede',
        (select id from customers where email = N'mail@jydskis.dk'),
        (select id from contact_types where type = N'TK'),
        (select id from contact_personel where initials = N'HH')
    ),
    (
        convert(datetime, N'08-06-95 08:30', 5),
        N'Pia Nissen',
        N'Bad om at',
        (select id from customers where company_name = N'Anker Juul'),
        (select id from contact_types where type = N'TO'),
        (select id from contact_personel where initials = N'AB')
    ),
    (
        convert(datetime, N'03-05-95 11:10', 5),
        N'Leo Nøhr',
        N'Anker ønsk',
        (select id from customers where email = N'hr@hholding.com'),
        (select id from contact_types where type = N'TO'),
        (select id from contact_personel where initials = N'MJ')
    ),
    (
        convert(datetime, N'07-05-95', 5),
        N'Ib Rossin',
        N'K95 ismaskine',
        (select id from customers where email = N'rv@vandland.dk'),
        (select id from contact_types where type = N'KA'),
        (select id from contact_personel where initials = N'HH')
    );
go
