(function() {
  var fs, http, server, spawn, url;

  spawn = require('child_process').spawn;

  http = require('http');

  url = require('url');

  fs = require('fs');

  server = http.createServer(function(request, response) {
    var lookup, requestURL, string;
    requestURL = url.parse(request.url, true);
    switch (requestURL.pathname) {
      case '':
      case '/':
      case '/index.html':
        return fs.readFile('index.html', function(err, data) {
          response.writeHead(200, {
            'Content-Type': 'text/html'
          });
          return response.end(data.toString());
        });
      case '/index.js':
        return fs.readFile('index.js', function(err, data) {
          response.writeHead(200, {
            'Content-Type': 'application/javascript'
          });
          return response.end(data.toString());
        });
      case '/jquery.js':
        return fs.readFile('jquery.all.js', function(err, data) {
          response.writeHead(200, {
            'Content-Type': 'application/javascript'
          });
          return response.end(data.toString());
        });
      case '/tooltipster.css':
        return fs.readFile('tooltipster.css', function(err, data) {
          response.writeHead(200, {
            'Content-Type': 'text/css'
          });
          return response.end(data.toString());
        });
      case '/search':
        lookup = spawn('./words', [requestURL.query.word]);
        string = '';
        lookup.stdout.on('data', function(data) {
          return string += data.toString();
        });
        return lookup.on('close', function() {
          response.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          return response.end(string);
        });
      case '/text':
        return fs.readFile('catilinamI.txt', function(err, data) {
          response.writeHead(200, {
            'Content-Type': 'text/plain'
          });
          return response.end(data.toString().split('\n')[requestURL.query.chapter - 1]);
        });
    }
  });

  console.log('listening on', process.env.PORT);

  server.listen(process.env.PORT);

}).call(this);

//# sourceMappingURL=web.js.map
