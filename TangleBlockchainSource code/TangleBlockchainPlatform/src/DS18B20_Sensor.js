     
const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const generate = require('iota-generate-seed');
const fs=require('fs');

 const { Board, Thermometer } = require("johnny-five");
const board = new Board();
var counter=1;
board.on("ready", () => {

  const thermometer = new Thermometer({
    controller: "DS18B20",
    pin: 8,
    freq: 3000
  });

  thermometer.on("change", () => {
  const {celsius} = thermometer;
 var data="  Temperature : "+celsius.toString()+"\n";
 console.log(data)

 const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});
const depth = 3;
const minimumWeightMagnitude = 14;
const seed =  generate();
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
var madonne={"message":data.toString()};
const message = JSON.stringify(madonne);

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
    console.log("Sender : Data number "+counter+" : "+madonne.message+"  sent to The Tangle and it's hash is : "+bundle[0].hash);
    counter++;
  })
  .catch(err => {
    console.error(err)
  });
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
  });
});

    


/*
   
*/

