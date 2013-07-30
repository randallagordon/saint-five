var five = require('johnny-five'),
    saint = require('../lib/saint-five');

saint.connect();

board = new five.Board();

board.on('ready', function() {

  saint.wire( new five.Servo({
    pin: 10,
    range: [0, 180],
    type: 'continuous',
    startAt: 90,
    center: false
  }) );

  saint.wire( new five.Servo({
    pin: 11,
    range: [0, 180],
    type: 'continuous',
    startAt: 90,
    center: false
  }) );

});

