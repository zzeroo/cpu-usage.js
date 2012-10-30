var app = require('express')()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn;

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});


setInterval(function() {
  grepProc();
}, 1000);

function grepProc() {
  cpustring = exec('grep \'^cpu\ \' /proc/stat',
    function(error, stdout, stderr) {
      var txt = new Buffer(stdout).toString('utf8', 0, stdout.length);
      calculateUsage(txt);
    });
}

// Helper
function calculateUsage(data) {
  var prev_total=0
    , prev_idle=0;

  data = data.split(' ');
  // remove the first element
  data.shift();
  // sum the array
  idle = data.reduce(sum);
}

function parseIntForSum(str) {
    var possibleInteger = parseInt(str);
    return isNaN(possibleInteger) ? 0 : possibleInteger;
}

function sum(f, s) {
    return parseIntForSum(f) + parseIntForSum(s);
}
