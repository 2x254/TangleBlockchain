// Import the High Mobility SDK, installed by yarn/npm
const HMKit = require('hmkit')
let Mam = require('../lib/mam.node.js');
let IOTA = require('iota.lib.js');

const socket = require(`zmq`).socket(`push`); 
var dgram = require('dgram');
const Connector= require('/iota/TangleBlockchainPlatform/src/Connector');
// socket.bindSync(`tcp://127.0.0.1:2002`); 
// Catch unhandled promise rejections
require('./errorhandling')

// Hack to work around using the precompiled mam library when we already have the babel polyfill in use
global._babelPolyfill = false

// Import the MAM client and Tryte conversion tools need to encode the JSON message to Trytes

//const { asciiToTrytes } = require('@iota/converter')
let seed = 'IOTADOTWTFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
// Initialize the MAM library by providing the Node, mode and secret key to use
// A random seed is generated since we won't be providing one
// Keep in mind that if you use a dedicated seed you need to keep track of the
// state of MAM in order for the MAM stream to work correctly.
let iota = new IOTA({ provider: `http://localhost:14265` });
let mamState = Mam.init(iota,seed,2,0)
var myConnector= new Connector();
// We are using MAM restricted mode with a shared secret in this example
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHIS'

const hmkit = new HMKit(
    "dGVzdHO+aZXuAV1T80+Voh9VlDiCaYWjXXV3HUkNbvAUaqphWDfmorerGa95Tsr+tCbBhiN9d4ABuo0lDFdHCUVYuUteeJcK9W4DD17rHJ3ONmGNML6LgCLj593AJcxhvrpYD/PzFQEtLBspo2Z4o2b6Xmsw3hjIGTW4gFuZOhK0NiL4RrAdtXBIbflonyQGnUSNmfddLLbr",
    "uBtwlZSSDV2z4Pbxrt+hN1PkxaOh9xVEdSY2N0MD0AQ="
);

// The access certificate for our car simulator is defined here
// FIXME: Change to your own Vehicle Access Token
const accessToken = 'd942c435-a05a-4726-9945-8921647bc819'

// You don't have to edit anything below this comment for this example

mamState = Mam.changeMode(mamState, mamType, mamSecret)

let lastCoords = null

// This function will take the High Mobility data and will publish it to the tangle

async function publish (data) {
  // We store the last sent coordinates so we won't have to send to the tangle unless we have a new position
  if (JSON.stringify(data.coordinates) === lastCoords) {
    console.log('Duplicate coordinates received, skipping...')
    return
  }

  // If it are new coordinates we create a new JSON string to send to the tangle
  console.log('Coordinates received:', data.coordinates)
  let toSend = JSON.stringify({ 'coords': data.coordinates, 'ts': new Date() })  
  lastCoords = JSON.stringify(data.coordinates)
  console.log('Data to send to tangle:', toSend)

  // Convert the JSON to trytes and create a MAM message
  const trytes = iota.utils.toTrytes(toSend)
  const message = Mam.create(mamState, trytes)

  // Update the MAM state to the state of this latest message
  // We need this so the next publish action knows it's state
  mamState = message.state;

  // Attach the message to the MAM stream / Tangle
  try {
    await Mam.attach(message.payload, message.address)
    console.log('Attached to tangle!')
 //after attach send data to edge server 
  } catch (e) {
    console.log(e)
  }
//send root to the connector 
/*

*/


  if (mamState.channel.start === 1) {
 console.log('\r\nListen to this stream with\n\r\n\r   >  the root is ', message.root, '\r\n\r\n'); 
 console.log("appel au connecteur");
 myConnector.Send_Data_To_Blockchain(message.root);
 /*
var PORT = 33337;
var HOST = '127.0.0.1';

var dgram = require('dgram');
//var m=message.root.toString()
var msg = new Buffer(message.root);

var client = dgram.createSocket('udp4');
client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to connector with adress and port : ' + HOST +':'+ PORT);
  client.close();
});
*/

    } 
  else 
  {
      myConnector.Send_Data_To_Blockchain(message.root);
 /* 
console.log('\r\nUpdated root: ', message.root, '\r\n');
var PORT = 33337;
var HOST = '127.0.0.1';

var dgram = require('dgram');
//var m=message.root.toString()
var msg = new Buffer(message.root);

var client = dgram.createSocket('udp4');
client.send(msg, 0, msg.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to Real connector with adress and port : ' + HOST +':'+ PORT);
  client.close();
}); 
*/





  }
}



async function updateLocation () {
  const accessCertificate = await hmkit.downloadAccessCertificate(accessToken)

  try {
    // Ask for the current Location based on the Auto API
    // https://high-mobility.com/learn/documentation/cloud-sdks/node-js/commands/
    const response = await hmkit.telematics.sendCommand(
      accessCertificate.getVehicleSerial(),
      hmkit.commands.VehicleLocationCommand.getLocation()
    )

    publish(response.parse())
  } catch (e) {
    console.log('error', e)
  }
}

console.log('\r\n\r\nUpdating MAM stream with vehicle location data\r\n')


updateLocation()

setInterval(updateLocation, 30000)
