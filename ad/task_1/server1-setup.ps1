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
new-netipaddress -InterfaceIndex 12 -IPAddress 192.168.122.100 -PrefixLength 24 -DefaultGateway 192.168.122.1
# The server can now recieve an SSH connection from the VM host on 192.168.122.100:22.

# Enable AD domain services.
install-windowsfeature AD-Domain-Services
import-module ADDSDeployment

# Create AD forest.
install-ADDSForest -DomainName "tec.dk" -DomainNetbiosName "TEC" -InstallDns:$true 

# Change DNS to the local IP.
Set-DNSClientServerAddress –interfaceIndex 12 –ServerAddresses "192.168.122.100"

# Rename computer.
rename-computer -newname server1
