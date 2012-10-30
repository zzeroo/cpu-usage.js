var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , spawn = require('child_process').spawn;

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

setInterval(function() {
  spawn('grep', ['^cpu\ ', '/proc/stat'])
    .stdout.on('data', function(data){
      var txt = new Buffer(data).toString('utf8', 0, data.length);
      console.log('stdout: ' + data);
    });
}, 1000);


// Helper
function parseIntForSum(str) {
    var possibleInteger = parseInt(str);
    return isNaN(possibleInteger) ? 0 : possibleInteger;
}

function sum(f, s) {
    return parseIntForSum(f) + parseIntForSum(s);
}
