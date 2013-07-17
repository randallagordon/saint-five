var five = require('johnny-five'),
    saint = require('../lib/saint-five');

saint.connect();

board = new five.Board;

board.on('ready', function() {
  saint.wire( new five.Button(2) );
  saint.wire( new five.Led(13) );
});

