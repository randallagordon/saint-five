var five = require('johnny-five'),
    saint = require('../lib/saint-five');

saint.connect();

board = new five.Board();

board.on('ready', function() {
  saint.wire( new five.Nodebot({
    right: 10,
    left: 11
  }) );
});

