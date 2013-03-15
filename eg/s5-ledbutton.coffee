five = require 'johnny-five'
saint = require '../lib/saint-five'

saint.connect()
saint.bless five

board = new five.Board

board.on 'ready', ->
  new five.Led({pin: 13}).fire()

  for i in [2..6]
    saint.fire button = new five.Button pin: i
