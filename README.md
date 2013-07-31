# saint-five ###################################################################

Strategic Artificially Intelligent Nodeular Transport Number 5 - Expose
[Johnny-Five](https://github.com/rwldrn/johnny-five) objects via
[Spacebrew](http://docs.spacebrew.cc/) for fun and profit!

### Code Example

    var five = require("johnny-five"),
        saint = require("saint-five");

    saint.connect();   // Connect to Spacebrew

    var board = new five.Board();

    board.on( "ready", function() {
      // Wire johnny-five objects to Spacebrew by calling
      // saint.wire and pass the object to be connected
      saint.wire( new five.Button( 2 ) ); 
      saint.wire( new five.Led( 13 ) ); 
    });

By default this will create a connection to the public [Spacebrew
Admin](http://spacebrew.github.com/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc)
interface. Any johnny-five objects connected will have their appropriate inputs
and outputs revealed in the interface ready to be wired as you wish!

To connect to another server: `saint.connect({ server: 'http://localhost/' })`

## Supported Johnny-Five Devices

 - LED (boolean)
 - Button (boolean)
 - Partial Servo support (min and max are exposed)
 - Nodebot (Using Device Orientation data from the [spacebrew-utils](https://github.com/randallagordon/spacebrew-utils) Sensor utility)

## TODO

 - Support more Johnny-Five devices!
 - Inject J5 objects into REPL in examples

## License #####################################################################

MIT
