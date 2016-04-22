UTSEUS-Binky
=======

Build your prototype in 36h - An innovation workshop at the UTSEUS, Shanghai
-----------

## Hardware
You'll need :
* A Raspberry Pi
* A Grove Pi shield
* A Grove Air Quality Sensor v1.3 connected to the A0 pin of the shield
* A Grove High-Accuracy barometer connected to an I2C pin of the shield
* Some time

## How to setup this repo
### Clone it somewhere
... only we know ♫

### Create a link to the directory
* Type `sudo ln -s /path/to/this/repo/ /var/www/binky
* Enjoy a static page at localhost/binky :)

### Start the Python script at Raspi boot
* Copy the `./raspi-config/binky` script to `/etc/init.d/`
* Run `sudo update-rc.d binky defaults`

### Automatically connect to a wifi network
See [this](http://weworkweplay.com/play/automatically-connect-a-raspberry-pi-to-a-wifi-network/) page
In short :
* Copy the `./raspi-config/|etc|network|interfaces` to `/etc/network/interfaces` (make a backup of it first)
* Copy the `./raspi-config/|etc|wpa_supplicant|wpa_supplicant.conf` to `/etc/wpa_supplicant/wpa_supplicant.conf`

