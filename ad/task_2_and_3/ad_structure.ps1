$grps = @("it", "management", "sales", "development", "marketing", "accounting")

for ($i=0; $i -lt $grps.length; $i++) {
	$grpnm = $grps[$i]
    # Create the OU group.
    new-adorganizationunit -name "it" -path "dc=tec,dc=dk"
    # Create the global group.
    new-adgroup "$grpnm" -path "ou=$grpnm,dc=tec,dc=dk" -groupscope Global -groupcategory Security

    for ($j=0; $j -lt 5; $j++) {
        $usrnm = "usr_$grpnm_$j"
        # Create and add users to the new group.
        new-aduser -name $usrnm -displayname $usrnm -givenname "$grpnm usr" -surname "$j" -department $grpnm
        enable-adaccount $usrnm
        add-adgroupmember $grpnm -members $usrnm
    }

    # Verify membership.
    get-adgroupmember $grpnm

    # Force new password at next logon.
    get-aduser -filter * -searchbase "ou=$grpnm,dc=tec,dc=dk" | set-aduser -changepasswordatlogon $true
}
