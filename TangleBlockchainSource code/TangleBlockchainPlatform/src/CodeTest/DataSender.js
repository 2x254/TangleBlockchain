const Connector= require('/iota/TangleBlockchainPlatform/src/Connector');
const Mam = require('@iota/mam');
let IOTA = require('iota.lib.js');
const { asciiToTrytes } = require('@iota/converter');
let seed = 'IOTADOTWTFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
let iota = new IOTA({ provider: `https://nodes.devnet.thetangle.org:443` });
let mamState = Mam.init(iota,seed,2,0);
const mamType = 'restricted'
const mamSecret = 'DONTSHARETHIS'
mamState = Mam.changeMode(mamState, mamType, mamSecret)
var myConnector= new Connector();
const publish = async data => {
  // Convert the JSON to trytes and create a MAM message
  const trytes = asciiToTrytes(data)
  const message = Mam.create(mamState, trytes)
  // Update the MAM state to the state of this latest message
  // We need this so the next publish action knows it's state
  mamState = message.state

  // Attach the message
  await Mam.attach(message.payload, message.address, 3, 9)
  console.log('Sent message to the Tangle!')
  console.log('Address: ' + message.root);
  //using the connectors
  myConnector.Send_Data_To_Blockchain(message.root);
}

setInterval(() => {
  publish('temperature : ' +Math.floor(Math.random()*(50-1+1)+1));
  }, 10000);



    
