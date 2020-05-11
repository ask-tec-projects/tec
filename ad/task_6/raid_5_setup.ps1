# Find the disk # by running get-disk and then initialize it.
initialize-disk -number 3

# Create a new raid 5 volume with disks 1 through 3 in diskpart. Assumes the following disk setup:
#
#DISKPART> list disk
#
#  Disk ###  Status         Size     Free     Dyn  Gpt
#  --------  -------------  -------  -------  ---  ---
#  Disk 0    Online           64 GB      0 B
#  Disk 1    Online         2048 MB  2015 MB        *
#  Disk 2    Online         2048 MB  2015 MB        *
#  Disk 3    Online         2048 MB  2046 MB
#select disk 1
#convert dyn
#select disk 2
#convert dyn
#select disk 3
#convert dyn
#create volume raid disk=1,2,3
#exit