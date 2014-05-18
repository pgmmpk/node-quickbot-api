var api = require('../index');

api.qb(api.defaultConfig, function(err, qb) {
    if (err) {
        return console.log('ERROR:', err);
    }

    qb.start();

    var worker = setInterval(function() {
        qb.onTimer();
        console.log(qb.irDistances());
    }, 10);

    qb.run(40, 40);

    setTimeout(function() {
	console.log("setting speed to ZERO");
	qb.run(0, 0);
	setTimeout(function() {
            console.log("Done");
	    clearInterval(worker);
	}, 2000);
    }, 2000);
});
