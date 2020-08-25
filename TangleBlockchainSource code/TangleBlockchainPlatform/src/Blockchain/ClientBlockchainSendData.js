setInterval(function(){ 
var PORT = 33332;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var temp=Math.floor(Math.random()*(50-1+1)+1);

var message = new Buffer('temperature: '+temp);
console.log('Client-Sender: data-to-send: "temperature: '+temp+'"');
var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
 
  client.close();
});
	                   
}, 3000); 