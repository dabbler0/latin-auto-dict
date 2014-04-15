# Copyright (c) 2014 Anthony Bau
#
# MIT License

{spawn} = require 'child_process'
http = require 'http'
url = require 'url'
fs = require 'fs'

server = http.createServer (request, response) ->
  requestURL = url.parse request.url, true

  switch requestURL.pathname
    when '', '/', '/index.html'
      fs.readFile 'index.html', (err, data) ->
        response.writeHead 200, 'Content-Type': 'text/html'
        response.end data.toString()

    when '/index.js'
      fs.readFile 'index.js', (err, data) ->
        response.writeHead 200, 'Content-Type': 'application/javascript'
        response.end data.toString()

    when '/jquery.js'
      fs.readFile 'jquery.all.js', (err, data) ->
        response.writeHead 200, 'Content-Type': 'application/javascript'
        response.end data.toString()

    when '/tooltipster.css'
      fs.readFile 'tooltipster.css', (err, data) ->
        response.writeHead 200, 'Content-Type': 'text/css'
        response.end data.toString()

    when '/search'
      lookup = spawn './words', [requestURL.query.word]
      
      string = ''

      lookup.stdout.on 'data', (data) ->
        string += data.toString()

        lines = string.split('\n')
        if lines[lines.length - 2] is '                          MORE - hit RETURN/ENTER to continue'
          lookup.stdin.write '\n'
          string = lines[...-2].join '\n'

      lookup.on 'close', ->
        response.writeHead 200, 'Content-Type': 'text/plain'
        response.end string

    when '/text'
      fs.readFile 'catilinamI.txt', (err, data) ->
        response.writeHead 200, 'Content-Type': 'text/plain'
        response.end data.toString().split('\n')[requestURL.query.chapter - 1]

console.log 'listening on', process.env.PORT
server.listen process.env.PORT
