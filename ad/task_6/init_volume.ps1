# Find the disk #s by running get-disk and then initialize it.
initialize-disk -number 1
initialize-disk -number 2

# Create a partition on disk 1.
new-partition -disknumber 1 -size 1.99GB -driveletter E

# Start diskpart and run the following commands.
# The commands are based on the following output from diskpart:
#DISKPART> list volume
#
#  Volume ###  Ltr  Label        Fs     Type        Size     Status     Info
#  ----------  ---  -----------  -----  ----------  -------  ---------  --------
#  Volume 0     D   IR3_SSS_X64  UDF    CD-ROM      4331 MB  Healthy
#  Volume 1         System Rese  NTFS   Partition    350 MB  Healthy    System
#  Volume 2     C                NTFS   Partition     63 GB  Healthy    Boot
#  Volume 3     E                RAW    Partition   2037 MB  Healthy
#
#DISKPART> list disk
#
#  Disk ###  Status         Size     Free     Dyn  Gpt
#  --------  -------------  -------  -------  ---  ---
#  Disk 0    Online           64 GB      0 B
#  Disk 1    Online         2048 MB     9 MB
#  Disk 2    Online         2048 MB  2046 MB
#
#select disk 1
#convert dyn
#select disk 2
#convert dyn
#select disk 1
#add disk=2
#exit

# To reverse the process.
#select disk 1
#clean all
#select disk 2
#clean all
#exit
initialize-disk -number 1
initialize-disk -number 2

# Create a striped volume between disk 1 and 2 in diskpart.
#select disk 1
#convert dyn
#select disk 2
#convert dyn
#create volume stripe size=2000 disk=1,2
#exit


# To reverse the process.
#select disk 1
#clean all
#select disk 2
#clean all
#exit
initialize-disk -number 1
initialize-disk -number 2