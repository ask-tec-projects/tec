# Install MS DHCP server.
install-windowsfeature DHCP -includemanagementtools

# Add default sec groups.
netsh dhcp add securitygroups
restart-service dhcpserver

# Authorize the server in AD.
add-dhcpserverindc -dnsname dhcp1.tec.dk -ipaddress 192.168.122.100

# Verify authorization attempt.
# Should produce the following output:
#
# IPAddress	        DnsName
# ---------	        -------
# 192.168.122.100   dhcp1.tec.dk
get-dhcpserverindc

# Define scope.
add-dhcpserverv4scope -name "clients" -startrange 192.168.122.20 -endrange 192.168.122.39 -state Active -leaseduration 8.0:00:00 -subnetmask 255.255.255.0
# Verify scope.
# Should produce the following output.

# ScopeId         SubnetMask      Name           State    StartRange      EndRange        LeaseDuration 
# -------         ----------      ----           -----    ----------      --- -----        ------------- 
# 192.168.122.0   255.255.255.0   clients        Active   192.168.122.20  192.168.122.39  8.00:00:00  
get-dhcpserverv4scope

# Default gateway, domain name and default gateway.
set-dhcpserverv4optionvalue -scopeid 192.168.122.0 -dnsserver 192.168.122.100 -dnsdomain "tec.dk" -router 192.168.122.1
