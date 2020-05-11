# Allow TCP connections on port 22.
new-netfirewallrule -Protocol TCP -LocalPort 22 -Direction Inbound -Action Allow -DisplayName SSH

# Install chocolatey
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install SSH server.
choco install openssh -y
. "C\Program Files\OpenSSH-Win64\install-sshd.ps1"
set-service sshd -StartupType Automatic
start-service sshd

# Set IP address.
new-netipaddress -InterfaceIndex 12 -IPAddress 192.168.122.200 -PrefixLength 24 -DefaultGateway 192.168.122.1
# The server can now recieve an SSH connection from the VM host on 192.168.122.200:22.

# Change DNS to the IP of server1.
Set-DNSClientServerAddress –interfaceIndex 12 –ServerAddresses "192.168.122.100"

# Change computer name
rename-computer -newname server2

# Check name resolution.
resolve-dnsname -Name tec.dk

# Join domain.
add-computer –domainname tec.dk -Credential TEC\Administrator -restart –force

# Enable AD domain services.
install-windowsfeature AD-Domain-Services
import-module ADDSDeployment

# Add domain controller
install-ADDSDomainController -DomainName "tec.dk" -InstallDns:$true -Credential (Get-Credential "TEC\Administrator")
