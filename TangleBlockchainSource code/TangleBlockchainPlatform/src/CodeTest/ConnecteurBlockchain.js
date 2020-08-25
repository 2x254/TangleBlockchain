
 const { spawn } = require('child_process');          
require('./errorhandling');
class ConnecteurBlockchain
{
    constructor(data)
    { this.data=data;
    }
    
    Send_data_From_Blockchain_to_Iota()
    {
  
// envoie data vers iota
const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const generate = require('iota-generate-seed');

 const iota = Iota.composeAPI({
  provider: 'http://localhost:10000'
});
const depth = 3;
const minimumWeightMagnitude = 14;
const seed =  generate();
//const seed="PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX";
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
var blockchaindata={"message": this.data};
const message = JSON.stringify(blockchaindata);

// Convert the message to trytes
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
    console.log("Connecteur-Blockchain : Data : "+blockchaindata.message+"  sent to The Tangle and it's hash is : "+bundle[0].hash);
   
  })
  .catch(err => {
    console.error(err)
  });
    }    
}
module.exports = ConnecteurBlockchain;
  