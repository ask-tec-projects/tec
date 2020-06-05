
bcp "select * from [customer_repository].dbo.contacts where point_of_contact like '%sen';" queryout .\out\sen_suffix.dat -U sa -q -c -t "," -S localhost -C 65001
