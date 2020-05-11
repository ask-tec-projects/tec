# Active Directory

*This folder is a subset of the git repository at
https://github.com/Kruhlmann/tec*.

Each folder corresponds to an assignment from itslearning. Every assignment
apart from assignment 7 has been completed with the powershell scripts found
inside.

The scripts can **not** be run in an arbitrary sequence, however the sequence
should be self evident.

Due to the lackluster support for GPO cmdlets in windows powershell the final
assignment has been completed using the graphical interface, and as such
contains screenshots as opposed to powershell scripts.

## SSH

Each server is being configured to run an SSH server such that they can be
accessed remotely from the host machine as follows:

```bash
ssh Administrator@192.168.122.39  # client 1
ssh Administrator@192.168.122.100 # server 1
ssh Administrator@192.168.122.200 # server 2
```

After creating AD users they can replace Administrator as the user on `client1`.
