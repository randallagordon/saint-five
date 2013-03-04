###
saint-five
https://github.com/randallagordon/saint-five

Copyright (c) 2013 Randall A. Gordon <randall@randallagordon.com>
Licensed under the MIT license.
###

Spacebrew = require('./sb-1.0.3.js').Spacebrew

server = 'sandbox.spacebrew.cc'
name = 'SAINT Number 5'
description = 'SAINT Number 5'

sb = new Spacebrew.Client(server, name, description)
sb.connect()

module.exports.Led = (led) ->
  sb.addSubscribe 'LED', 'boolean'
  sb.onBooleanMessage = (name, value) ->
    if value then led.on() else led.off()
  return

module.exports.Button = (button) ->
  sb.addPublish 'Button', 'boolean', 'false'
  button.on 'down', ->
    sb.send('Button', 'boolean', 'true')
  button.on 'up', ->
    sb.send('Button', 'boolean', 'false')
  return

module.exports.fire = (j5obj) ->
  module.exports[j5obj.constructor.name](j5obj)
  return
