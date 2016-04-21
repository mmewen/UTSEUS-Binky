<?php
   exec('sudo python /home/pi/Desktop/Binky/UTSEUS-Binky/grovepi/scan.py');
/*
You must put this in /etc/sudoers :
apache ALL = NOPASSWD: /sbin/halt /usr/bin/python
(or)
www-data ALL = NOPASSWD: /sbin/halt /usr/bin/python
?>
