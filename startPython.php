<?php
	$cmd = 'python /home/pi/Desktop/Binky/UTSEUS-Binky/grovepi/scan.py';
	echo shell_exec(sprintf("nohup %s > %s & echo $!", $cmd, "/tmp/binkyScan"));

/*
You must put this in /etc/sudoers :
apache ALL = NOPASSWD: /sbin/halt /usr/bin/python
(or)
www-data ALL = NOPASSWD: /sbin/halt /usr/bin/python
*/
?>
