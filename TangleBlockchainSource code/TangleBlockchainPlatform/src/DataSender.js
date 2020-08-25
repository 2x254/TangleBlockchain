const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const generate = require('iota-generate-seed');
 setInterval(function(){ 
    const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});

const depth = 3;
const minimumWeightMagnitude = 14;
const seed =  generate();
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
// creer une donnée simulant la température aléatoirement
var madonne={"message":"temperature : "+Math.floor(Math.random()*(50-1+1)+1)};
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
    console.log(madonne.message+"  sent to The Tangle and it's hash is : "+bundle[0].hash);
    
  })
  .catch(err => {
    console.error(err)
  });

 }, 15000);