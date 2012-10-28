var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , spawn = require('child_process').spawn;

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

var com = spawn('dstat', ['-c', '--nocolor']);
com.stdout.on('data', function(data){
  var txt = new Buffer(data).toString('utf8', 0, data.length);
    io.sockets.send(100 - parseInt(txt.split('  ')[2]));
});
