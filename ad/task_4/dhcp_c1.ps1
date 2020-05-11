# Set DHCP ip and DNS for interfaces that are "up".
$adapter = Get-NetAdapter | ? {$_.Status -eq "up"}
$interface = $adapter | Get-NetIPInterface -AddressFamily "IPv4"

$interface | Set-NetIPInterface -DHCP Enabled
$interface | Set-DnsClientServerAddress -ResetServerAddresses
ipconfig /release
ipconfig /renew

# Verify new IP, DNS and def gateway.
ipconfig /all

# This is unlikely to work in a qemu-kvm environment as the host machine has a
# seperately configured DHCP server, and it will usually be this server, which
# ends up providing the ip address for the clients.
#
# Due to this I was unable to test the lease duration and address reservation.
# Please refer to [dhcp_verify.ps1](ad/task_4/dhcp_verify.ps1) for the means to test
# the configuration.
