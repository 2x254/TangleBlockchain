const Connector= require('/iota/TangleBlockchainPlatform/src/Connector');
let Mam = require('../lib/mam.node.js');
let IOTA = require('iota.lib.js');
require('./errorhandling');
//require('babel-polyfill');
let seed='IOTADOTWTFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';
let iota = new IOTA({ provider: `http://localhost:14265` })
let mamState = Mam.init(iota,seed,2,0)
const mamType = 'restricted';
const mamSecret = 'DONTSHARETHIS';
mamState = Mam.changeMode(mamState, mamType, mamSecret)
//mamState = Mam.changeMode(mamState, 'public')
var root;
//var myConnector= new Connector();
const publish = async data => {
  const trytes = iota.utils.toTrytes(data);
console.log(trytes);
  const message = Mam.create(mamState, trytes);
  mamState = message.state;
  await Mam.attach(message.payload, message.address);
  console.log('Sent message to the Tangle!');
root=  message.root;
console.log(message.root);
//var myConnector= new Connector();
//myConnector.Send_Data_To_Blockchain(message.root);
}
console.log('sending....');
  publish('temperature : '+Math.floor(Math.random()*(50-1+1)+1));



/*
const Iota = require('@iota/core');
const Converter = require('@iota/converter');

// Connect to a node
const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});

const depth = 3;
const minimumWeightMagnitude = 9;

// Define a seed and an address.
// These do not need to belong to anyone or have IOTA tokens.
// They must only contain a mamximum of 81 trytes
// or 90 trytes with a valid checksum
const address =
  'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
const seed =
  'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';

// Define a message to send.
// This message must include only ASCII characters.
const message = JSON.stringify({"message": "Salemou alaykom"});

// Convert the message to trytes
const messageInTrytes = Converter.asciiToTrytes(message);

// Define a zero-value transaction object
// that sends the message to the address
const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

// Create a bundle from the `transfers` array
// and send the transaction to the node
iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
    console.log(bundle[0].hash);
  })
  .catch(err => {
    console.error(err)
  });
*/