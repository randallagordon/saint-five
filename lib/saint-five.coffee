###
 * saint-five
 * https://github.com/randallagordon/saint-five
 *
 * Copyright (c) 2013 Randall A. Gordon <randall@randallagordon.com>
 * Licensed under the MIT license.
###

Spacebrew = require('spacebrew.js').Spacebrew

defaults =
  server: 'sandbox.spacebrew.cc'
  name: 'SAINT Number 5'
  description: 'Strategic Artificially Intelligent Nodeular Transport Number 5'

sb = {}
ranges = {}
booleans = {}
strings = {}

module.exports.connect = (opts) ->
  opts = opts || {}
  sb = new Spacebrew.Client(opts.server || defaults.server,
                            opts.name || defaults.name,
                            opts.description || defaults.description)
  sb.connect()

  sb.onRangeMessage = (name, value) ->
    ranges[name](value)

  sb.onBooleanMessage = (name, value) ->
    booleans[name](value)

  sb.onStringMessage = (name, value) ->
    strings[name](value)

# Johnny-Five abstractions

module.exports.led = (led) ->
  led = led || this
  ledID = 'Led' + led.pin
  sb.addSubscribe ledID, 'boolean'
  booleans[ledID] = (value) ->
    if value then led.on() else led.off()
  return

module.exports.button = (button) ->
  button = button || this
  buttonID = 'Button' + button.pin
  sb.addPublish buttonID, 'boolean', 'false'
  button.on 'down', ->
    sb.send(buttonID, 'boolean', 'true')
  button.on 'up', ->
    sb.send(buttonID, 'boolean', 'false')
  return

# Stand Alone
module.exports.fire = (j5obj) ->
  module.exports[j5obj.constructor.name.toLowerCase()](j5obj)
  return

# Monkey Patch
module.exports.bless = (five) ->
  [
    'Led',
    'Button'
  ].forEach (constructor) ->
    five[constructor].prototype.fire = module.exports[constructor.toLowerCase()]
