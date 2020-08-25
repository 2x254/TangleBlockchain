
var Web3 = require('web3');
var Promise = require('promise');
var Tx = require('ethereumjs-tx').Transaction;
var keythereum = require("keythereum");
const ethWallet = require('ethereumjs-wallet');
var web3;

web3= new Web3("http://127.0.0.1:8280");

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


web3.eth.getAccounts().then(function (accounts){

web3.eth.sendTransaction({
    from: accounts[0],
    to: accounts[0],
    value: web3.utils.toHex(web3.utils.toWei('0', 'wei')), 
    data: web3.utils.asciiToHex("coucou"), 
    gasPrice: web3.utils.asciiToHex(100000), 
    gasLimit:'0x2fefd8'
}).catch(err => {
    console.error(err);
  });;

console.log('Data sent as a transaction To Geth Node !');
});


  });
});


