$grps = @("it", "management", "sales", "development", "marketing", "accounting")
$path = "C:\var\usr_res"
$name = "User Resources"

mkdir $path
new-smbshare -path $path -name $name -fullaccess "Users"

for ($i=0; $i -lt $grps.length; $i++) {
    $grpnm = $grps[$i]
    $grpdir = "\\server1\$name\$grpnm"
    $ntfsgrpr = "Shared.$grpnm.r"
    $ntfsgrpw = "Shared.$grpnm.w"
    $acl = new-object System.Security.AccessControl.DirectorySecurity
    $admin = new-object System.Security.Principal.NTAccount("tec\administrator")

    # Create and apply access rules for read and write group.
    mkdir $grpdir

    # Create access rules.
    $arr = new-object System.Security.AccessControl.FileSystemAccessRule("$ntfsgrpr", "ReadAndExecute", "Allow")
    $arw = new-object System.Security.AccessControl.FileSystemAccessRule("$ntfsgrpw", "Modify", "Allow")
    
    # Apply access rules.
    $acl.SetAccessRuleProtection($true, $false)
    $acl.AddAccessRule($arr)
    $acl.AddAccessRule($arw)
    $acl.SetOwner($admin)
    $acl | set-acl $grpdir

    echo "Applied group access for group $ntfsgrpr to folder $grpdir"
}
