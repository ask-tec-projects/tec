# Allow TCP connections on port 22.
new-netfirewallrule -Protocol TCP -LocalPort 22 -Direction Inbound -Action Allow -DisplayName SSH

# Start ssh server. The client is running windows 10 and support OpenSSH natively.
add-windowscapability -Online -Name OpenSSH.Server~~~~0.0.1.0
start-service sshd
set-service -Name sshd -StartupType Automatic

# Set IP address
new-netipaddress -InterfaceIndex 6 -IPAddress 192.168.122.39 -PrefixLength 24 -DefaultGateway 192.168.122.1
# The client can now recieve an SSH connection from the VM host on 192.168.122.39:22.

# Rename client.
rename-computer -newname client1

# Change DNS to the IP of server1.
set-DNSClientServerAddress –interfaceIndex 6 –ServerAddresses "192.168.122.100"

# Join domain.
add-computer –domainname tec.dk -Credential TEC\Administrator -restart –force
