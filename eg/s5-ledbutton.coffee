five = require 'johnny-five'
saint = require '../lib/saint-five'

saint.connect()
saint.bless five

board = new five.Board

board.on 'ready', ->
  # Monkey around...
  new five.Led({pin: 13}).fire()

  # Or not...
  for i in [2..6]
    saint.fire button = new five.Button pin: i
