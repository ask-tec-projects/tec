sqlcmd -S localhost -q "select count(*) from [customer_repository].dbo.[contacts_joined] where personel_initials in ('MJ', 'AB', 'HH');" -f 65001
