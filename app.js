var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn;

server.listen(3000);
  
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use("/css", express.static(__dirname + '/css'));

var prev_total=0
  , prev_idle=0;

setInterval(function() {
  grepCPU();
}, 1000);

setInterval(function() {
  grepDF();
}, 1000);

// Helper
function grepCPU() {
  exec('grep \'^cpu\ \' /proc/stat',
      function(error, stdout, stderr) {
        var txt = new Buffer(stdout).toString('utf8', 0, stdout.length);
        calculateUsage(txt);
      });
}

function grepDF() {
  exec('df |sort',
      function(error, stdout, stderr) {
        var txt = new Buffer(stdout).toString('utf8', 0, stdout.length);
        calculateDF(txt);
      });
}


function calculateUsage(data) {
  data = data.split(' ');
  // remove the first element
  data.shift();
 
  var total = 0;
  // sum the array
  idle = data[4];

  total = data.reduce(sum);

  diff_idle=idle-prev_idle;
  diff_total=total-prev_total;
  diff_usage=(1000*(diff_total-diff_idle)/diff_total+5)/10;

  var usage = roundNumber(diff_usage,0);
  console.log(usage);
  io.sockets.emit('message', usage);

  prev_total=total;
  prev_idle=idle;
}

function calculateDF(data){
  io.sockets.emit('df', data);
}

function parseIntForSum(str) {
    var possibleInteger = parseInt(str);
    return isNaN(possibleInteger) ? 0 : possibleInteger;
}

function sum(f, s) {
    return parseIntForSum(f) + parseIntForSum(s);
}

function roundNumber(number, decimals) { // Arguments: number to round, number of decimal places
  var newnumber = new Number(number+'').toFixed(parseInt(decimals));
  return parseFloat(newnumber);
}
