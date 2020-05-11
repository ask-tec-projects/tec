# Reserve an address for client1.
add-dhcpserverv4reservation -scopeid 192.168.122.0 -ipaddress 192.168.122.39 -clientid "52-54-00-E3-F8-46" -description "Reservation for client1"
# Check lease duration for the default scope.
get-dhcpserverv4lease -scopeid 192.168.122.0
