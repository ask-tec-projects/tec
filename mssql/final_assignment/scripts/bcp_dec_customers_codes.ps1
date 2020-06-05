bcp "select * from [customer_repository].dbo.[contacts_joined] where personel_name = 'Anne Bendix' order by ts desc;" queryout .\out\desc_contacts.dat -U sa -q -c -t "," -S localhost -C 65001
