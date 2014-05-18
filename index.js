var motors = require('./robot/motors'),
    sensors = require('./robot/sensors'),
    qb = require('./robot/qb'),
    config = require('./robot/config');

module.exports = {
    defaultConfig: config,
    motors: motors,
    sensors: sensors,
    qb: qb
};

