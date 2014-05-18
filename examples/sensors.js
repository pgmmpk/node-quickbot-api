
var api = require('../index');

api.sensors(api.defaultConfig, function(err, sensors) {
    if (err) {
        return console.log('ERROR:', err);
    }

    sensors.start();

    sensors.read();

    var timer = sensors.timer;
    var ticksLeft = sensors.ticksLeft;
    var ticksRight = sensors.ticksRight;

    var ontimerId = setInterval(ontimer, 100);

    function ontimer() {
        sensors.read();

        if (ticksLeft != sensors.ticksLeft || ticksRight != sensors.ticksRight) {
            ticksLeft = sensors.ticksLeft;
            ticksRight = sensors.ticksRight;

            console.log(ticksLeft, ticksRight, sensors.speedLeft, sensors.speedRight);
        }
    }
    
    setTimeout(function() {
        clearInterval(ontimerId);
        sensors.stop()
    }, 10000);

    console.log('You have 10 seconds to rotate wheels and see ticks flowing out');
});
