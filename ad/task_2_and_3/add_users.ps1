$grps = @("it", "management", "sales", "development", "marketing", "accounting")
$defpass = "Defaultpass123"

# Create NTFS share ou.
new-adorganizationalunit -name "ntfs" -path "dc=tec,dc=dk"

for ($i=0; $i -lt $grps.length; $i++) {
	$grpnm = $grps[$i]
    # Create the OU group.
    new-adorganizationalunit -name $grpnm -path "dc=tec,dc=dk"
    ## Create the global group.
    new-adgroup "$grpnm" -path "ou=$grpnm,dc=tec,dc=dk" -groupscope Global -groupcategory Security
    # Add domain local NTFS share group.
    $ntfsgrpr = "Shared.$grpnm.r"
    $ntfsgrpw = "Shared.$grpnm.w"
    new-adgroup $ntfsgrpr -samaccountname $ntfsgrpr -groupscope DomainLocal -path "ou=ntfs,dc=tec,dc=dk"
    new-adgroup $ntfsgrpw -samaccountname $ntfsgrpw -groupscope DomainLocal -path "ou=ntfs,dc=tec,dc=dk"

    for ($j=0; $j -lt 5; $j++) {
        $usrnm = "usr_$grpnm" + "_$j"
        # Create and add users to the new group.
        new-aduser -name $usrnm -displayname $usrnm -givenname "$grpnm $usrnm" -surname "$j" -department $grpnm
        set-adaccountpassword -identity $usrnm -reset -newpassword (convertto-securestring -asplaintext "$defpass" -force)
        enable-adaccount $usrnm
        add-adgroupmember $grpnm -members $usrnm
        add-adgroupmember "Shared.$grpnm.r" -members $usrnm
        add-adgroupmember "Shared.$grpnm.w" -members $usrnm
    }

    # Verify membership.
    get-adgroupmember $grpnm

    # Force new password at next logon.
    get-aduser -filter * -searchbase "ou=$grpnm,dc=tec,dc=dk" | set-aduser -changepasswordatlogon $true

}
