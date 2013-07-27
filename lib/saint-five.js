/*
 * saint-five
 * https://github.com/randallagordon/saint-five
 *
 * Copyright (c) 2013 Randall A. Gordon <randall@randallagordon.com>
 * Licensed under the MIT license.
*/

var Spacebrew = require('spacebrew.js').Spacebrew;

var sb = {},
    ranges = {},
    booleans = {},
    strings = {};

var defaults = {
  server: 'sandbox.spacebrew.cc',
  name: 'SAINT Number 5',
  description: 'Strategic Artificially Intelligent Nodeular Transport Number 5'
};

module.exports.connect = function( opts ) {
  opts = opts || {};

  sb = new Spacebrew.Client( opts.server || defaults.server,
                             opts.name || defaults.name,
                             opts.description || defaults.description );

  sb.connect();

  sb.onRangeMessage = function( name, value ) {
    ranges[ name ]( value );
  };

  sb.onBooleanMessage = function( name, value ) {
    booleans[ name ]( value );
  };

  sb.onStringMessage = function( name, value ) {
    strings[ name ]( value );
  };
};

module.exports.led = function( led ) {
  led = led || this;

  var ledID = 'Led' + led.pin;
  sb.addSubscribe( ledID, 'boolean' );

  booleans[ ledID ] = function( value ) {
    if ( value ) {
      led.on();
    } else {
      led.off();
    }
  };
};

module.exports.button = function( button ) {
  button = button || this;

  var buttonID = 'Button' + button.pin;
  sb.addPublish( buttonID, 'boolean', 'false' );

  button.on( 'down', function() {
    sb.send( buttonID, 'boolean', 'true' );
  });

  button.on( 'up', function() {
    sb.send( buttonID, 'boolean', 'false' );
  });
};

module.exports.servo = function( servo ) {
  servo = servo || this;

  var servoRange = [ 0, 180 ];

  var servoID = 'Servo' + servo.pin;
  sb.addSubscribe( servoID + 'min', 'boolean' );
  sb.addSubscribe( servoID + 'max', 'boolean' );

  booleans[ servoID + 'min' ] = function( value ) {
    if( value ) {
      servo.min();
    } else {
      servo.center();
    }
  };

  booleans[ servoID + 'max' ] = function( value ) {
    if( value ) {
      servo.max();
    } else {
      servo.center();
    }
  };
};

module.exports.wire = module.exports.fire = function( j5obj ) {
  module.exports[ j5obj.constructor.name.toLowerCase() ]( j5obj );
};

module.exports.arm = function( five ) {
  [ 'Led', 'Button', 'Servo' ].forEach( function( constructor ) {
    five[ constructor ].prototype.fire = module.exports[ constructor.toLowerCase() ];
  });
};
