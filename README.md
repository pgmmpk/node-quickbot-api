node-quickbot-api
=================

QuickBot API. QuickBot is a wheeled robot built as part of Coursera "Control of Mobile Robots" class. This package provides
high-level JavasScript API to robots motors and sensors.

## API

### motors
Asynchronous function `motors` provides API for driving robot's motors

```javascript
var qbapi = require('quickbot-api');

qbapi.motors(qbapi.defaultConfig, function(err, motors) {
	// check for error first
	if (err) {
		return console.log('ERROR:', err);
	}
	
	// no error, do something with 'motors' object
});
```

### motors.run(torque_left, torque_right)

Activates robot motors. Torque values must be between -100..+100. Applies a fixed torques to the wheels. Negative torque
means "reverse". Positive torque will rotate wheel forward. Zero value will stop the wheel.

### motors.close()

Unloads drivers, use this at the very end to cleanup.

### sensors
Asynchronous function `sensors` provides API for accessing robot sensors

```javascript
var qbapi = require('quickbot-api');

qbapi.sensors(qbapi.defaultConfig, function(err, sensors) {
	// check for error first
	if (err) {
		return console.log('ERROR:', err);
	}
	
	// no error, do something with 'sensors' object
});
```

### sensors.start()
Must be called once before reading sensory data. Starts ADC driver.

### sensors.read()
Reads all sensors and stores result in properties. Call this function with your processing loop to refresh sensor data.

### sensors.timer
ADC timer value. This is a time expressed in ADC scan clock units. ADC scans are performed at approx 121000 scans per second.
Useful if you need to measure time intervals.

### sensors.encTicksLeft, sensors.encTicksRight
Value of left(right) encoder ticks. Robot has 16-teeth encoder wheel, therefore if you divide ticks by 16 you will get the number
of wheel revolutions since the start of the driver. Note that these are **unsigned** ticks, meaning that ticks grow no matter which
direction (forward or backward) wheel rotates.

### sensors.speedLeft, sensors.speedRight
Speed of the wheel rotation in ticks per second. Divide this by 16 (number of encoder wheel teeth) to get speed in rotations per second.

### sensors.values
An array of readings from 5 IR sensors (left side, left, center, right, right side). Values are millivolts.

### sensors.stop()
Stops the driver capturing sensor values.

### sensors.adc
Provides access to low-level ADC capture object

### qb
Asynchronous function `qb` provides high-level API for controlling the robot and reading robot's state.

```javascript
var qbapi = require('quickbot-api');

qbapi.qb(qbapi.defaultConfig, function(err, qb) {
	// check for error first
	if (err) {
		return console.log('ERROR:', err);
	}
	
	// no error, do something with 'qb' object
});
```

### qb.start()
Starts robot drivers. Call this once before using the robot.

### qb.onTimer()
Must be called from a timer routine at frequency 100Hz. It recomputes internal state, adjusts torque depending on surface drag,
infers tick and speed sign, etc.

### qb.setSpeed(speed_left, speed_right)
Sets reference robot speed in ticks per second. Negative values will make wheel rotate backwards. Robot utilizes PID controller
that changes torque applied to motors in order to achieve the reference speed.

Reasonable values are
between 20..120 and between -120..-20. Moving slower than 20 ticks/sec is problematic because of the robot mechanics. Set to zero
to stop the robot. Note that setting speed to zero while robot is moving will cause robot to apply negative torque (i.e. perform
active breaking). This typically looks like a very sudden and jerky stop. In practice, one may want to stop slowly by using some
interpolation.

### qb.getIrDistances()
Returns set of 5 IR distance measurements in inches.

### qb.getTicks()
Returns an array of two values - left ticks, and right ticks. Note that these are **signed** ticks. If robot moves backward,
ticks will decrement. When robot moves forward, ticks will increment.

### qb.resetTicks()
Reset ticks values to zeroes

### qb.getSpeed()
Returns an array of actual speeds of bot wheels.

### qb.stop()
Stops robot sensors. Cleanup to be called after all work with robot is complete.

## License
MIT

