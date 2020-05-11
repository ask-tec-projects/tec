$grps = @("it", "management", "sales", "development", "marketing", "accounting")

cd C:\
mkdir share
mkdir share\resources
cd share\resources

new-smbshare -path "C:\share\resources" -fullaccess "TEC\Administrator" -readaccess "Users" -name "resources"

for ($i=0; $i -lt $grps.length; $i++) {
    mkdir $grps[$i]
}
