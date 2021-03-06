import time
import grove_i2c_temp_hum_mini # temp + humidity
import hp206c # altitude + temp + pressure
import grovepi  # used by air sensor and dust sensor
import atexit # used for the dust sensor
import json

# atexit.register(grovepi.dust_sensor_dis)

# Initialize the sensors
# t= grove_i2c_temp_hum_mini.th02()
h= hp206c.hp206c()
# grovepi.dust_sensor_en()
air_sensor = 0
grovepi.pinMode(air_sensor,"INPUT")

ret=h.isAvailable()
if h.OK_HP20X_DEV == ret:
	print "HP20x_dev is available."   
else:
	print "HP20x_dev isn't available."


while True:
	temp = h.ReadTemperature()
	# temp2 = t.getTemperature()
	pressure = h.ReadPressure()
	altitude = h.ReadAltitude()
	# humidity = t.getHumidity()
	air_quality = "--"

  #   try:
  #   	# Get dust
		# [new_val,lowpulseoccupancy] = grovepi.dustSensorRead()
		# if new_val:
		# 	print lowpulseoccupancy
  #   except IOError:
  #	   print ("Error")

	try:
		# Get air quality
		air_quality = grovepi.analogRead(air_sensor)

		if air_quality > 700:
			print ("High pollution")
		elif air_quality > 300:
			print ("Low pollution")
		else:
			print ("Air fresh")
	except IOError:
		print ("Error on air quality")

	# Send result
	data = {
		"air_quality": air_quality,
		"temperature": temp,
		"pressure": pressure,
		"altitude": altitude
	}

	print json.dumps(data)
	with open('/home/pi/Desktop/Binky/UTSEUS-Binky/data.json', 'w') as f:
		f.write(json.dumps(data))
	time.sleep(.5)
