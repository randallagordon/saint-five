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
    return ranges[ name ]( value );
  };

  sb.onBooleanMessage = function( name, value ) {
    return booleans[ name ]( value );
  };

  return sb.onStringMessage = function( name, value ) {
    return strings[ name ]( value );
  };
};

module.exports.led = function( led ) {
  led = led || this;

  var ledID = 'Led' + led.pin;
  sb.addSubscribe( ledID, 'boolean' );

  booleans[ ledID ] = function( value ) {
    if ( value ) {
      return led.on();
    } else {
      return led.off();
    }
  };
};

module.exports.button = function( button ) {
  button = button || this;

  var buttonID = 'Button' + button.pin;
  sb.addPublish( buttonID, 'boolean', 'false' );

  button.on( 'down', function() {
    return sb.send( buttonID, 'boolean', 'true' );
  });

  button.on( 'up', function() {
    return sb.send( buttonID, 'boolean', 'false' );
  });
};

module.exports.fire = function( j5obj ) {
  module.exports[ j5obj.constructor.name.toLowerCase() ]( j5obj );
};

module.exports.bless = function( five ) {
  return [ 'Led', 'Button' ].forEach( function( constructor ) {
    return five[ constructor ].prototype.fire = module.exports[ constructor.toLowerCase() ];
  });
};
