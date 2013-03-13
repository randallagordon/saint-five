# saint-five ###################################################################

Expose Johnny-Five objects via Spacebrew for fun and profit!

### Code Example

    var five = require("johnny-five"),
        saint = require("saint-five");

    saint.connect();   // Connect to Spacebrew
    saint.bless(five); // Monkey patch

    var board = new five.Board();

    board.on( "ready", function() {
      // Wire johnny-five objects
      new five.Led(13).fire();
      saint.fire(new five.Button(2)); 
    });

### TODO

 - Support more johnny-five abstractions

## License #####################################################################

MIT
