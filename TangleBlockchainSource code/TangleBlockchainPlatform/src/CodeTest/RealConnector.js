

global._babelPolyfill = false;

// Catch unhandled promise rejections
require('./errorhandling');

// Import the MAM client and Tryte conversion tools need to encode the JSON message to Trytes
const Mam = require('@iota/mam');
const { trytesToAscii } = require('@iota/converter');

// Initialize the MAM library by providing the Node, mode and secret key to use


const mamType = 'restricted';
const mamSecret = 'DONTSHARETHIS';

 var udpreceiver = require('dgram');   
 var PORT = 33337;
var HOST = '127.0.0.1';   

var server = udpreceiver.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
 console.log('listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
let root = null;
let nextRoot=message;
console.log("root received : "+nextRoot);
if(nextRoot !==null)
{

function showData (raw) {
  const data = JSON.parse(trytesToAscii(raw));
  console.log("data received: ",data);
}

// Connect to the IOTA node using this function
async function initMam () {
  console.log('\r\n\r\n')
  console.log('Attaching to IOTA Node....')
  console.log('\r\n')
  await Mam.init('http://localhost:10000');
}

// Check the MAM stream every 5 seconds for new data on the current root
// If a new root is returned we'll monitor that one from there on.
async function checkMam () {
  if (root !== nextRoot) {
    root = nextRoot;
  }

  // The showData callback will be called in order for each message found
  const data = await Mam.fetch(root, mamType, mamSecret, showData)
  nextRoot = data.nextRoot;

  // Check again in 5 seconds
  setTimeout(checkMam, 5000);
}

// Start the monitoring!
initMam();
checkMam();
 }

});
server.bind(PORT, HOST); 