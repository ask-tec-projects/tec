new-item -path "c:\data\db\customer_repository" -type directory
sqlcmd -S localhost -i ".\db_struct.sql" -f 65001
sqlcmd -S localhost -i ".\db_insert.sql" -f 65001
