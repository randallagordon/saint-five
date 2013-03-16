# saint-five ###################################################################

Strategic Artificially Intelligent Nodeular Transport Number 5 - Expose
[Johnny-Five](https://github.com/rwldrn/johnny-five) objects via
[Spacebrew](http://docs.spacebrew.cc/) for fun and profit!

### Code Example

    var five = require("johnny-five"),
        saint = require("saint-five");

    saint.connect();   // Connect to Spacebrew
    saint.bless(five); // Add fire() method to supported hardware

    var board = new five.Board();

    board.on( "ready", function() {
      // Two ways to wire johnny-five objects to Spacebrew
      // fire() method added by the saint.bless() call
      new five.Led(13).fire();
      // Or call it via saint.fire and pass the object
      saint.fire(new five.Button(2)); 
    });

By default this will create a connection to the public [Spacebrew
Admin](http://spacebrew.github.com/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc)
interface.

To connect to another server: `saint.connect({ server: 'http://localhost/' })`

### TODO

 - Support more johnny-five abstractions

## License #####################################################################

MIT
