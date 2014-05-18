var api = require('../index'),
    pruadc = require('pru-adc'),
    async = require('async');

async.parallel([
    api.motors.bind(null, api.defaultConfig),
    pruadc
    ], function(err, values) {
    if (err) {
        return console.log('ERROR:', err)
    }
    var motors = values[0];
    var adc = values[1];

    adc.encoder0Pin(api.defaultConfig.MOTOR_LEFT.encoder_pin);
    adc.encoder1Pin(api.defaultConfig.MOTOR_RIGHT.encoder_pin);
    adc.encoder0Threshold(4096);
    adc.encoder1Threshold(4096);
    adc.start();

    motors.run(60, 60);

    setTimeout(function() {
        motors.close();

        var enc0Values = adc.encoder0Values();
        var enc0Range = enc0Values[2] - enc0Values[1];  // max - min
        var enc1Values = adc.encoder1Values();
        var enc1Range = enc1Values[2] - enc1Values[1];  // max - min

        var enc0Threshold = Math.round(enc0Range * 0.85);
        var enc1Threshold = Math.round(enc1Range * 0.85);

        if (enc0Threshold === 0) {
            console.log('ERROR: something wrong with the left wheel motor or encoder (sensor range was zero)');
        }
        if (enc1Threshold === 0) {
            console.log('ERROR: something wrong with the right wheel motor or encoder (sensor range was zero)');
        }

        console.log('Recommended threshold (left wheel):', enc0Threshold);
        console.log('Recommended threshold (right wheel):', enc1Threshold);

        adc.stop();
    }, 2000);
});
