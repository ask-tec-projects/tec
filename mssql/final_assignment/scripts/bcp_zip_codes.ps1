bcp "select id from [customer_repository].dbo.customers where zip_code > 8000 or zip_code = 3700;" queryout .\out\zip_codes.dat -U sa -q -c -t "," -S localhost -C 65001
