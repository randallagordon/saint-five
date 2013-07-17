five = require 'johnny-five'
saint = require '../lib/saint-five'

saint.connect()
saint.arm five

board = new five.Board

board.on 'ready', ->
  new five.Led({pin: 13}).fire()

  for i in [2..12]
    saint.fire button = new five.Button pin: i
