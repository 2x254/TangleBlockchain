const sender=require('dgram');    
const Iota = require('@iota/core');
const Extract = require('@iota/extract-json');
let zmq = require('zeromq');
let sock = zmq.socket('sub');
const txconverter= require('@iota/transaction-converter');
const converter=require('@iota/converter');
const fs =require('fs');
var Web3 = require('web3');
var Promise = require('promise');
var web3;

web3= new Web3("http://127.0.0.1:8280")


sock.connect('tcp://localhost:5556')

sock.subscribe('tx_trytes');

console.log("Connector : Waiting Data from EdgeNode...");

const iota = Iota.composeAPI({
  provider: 'http://localhost:10000'
});



sock.on('message', msg => {
 

const data = msg.toString().split(' ');
const txobj = txconverter.asTransactionObject(data[1]);
const writtable_data=JSON.stringify(txobj,null,4);

fs.appendFile("C:/iota/TangleBlockchainPlatform/fullnodeTransactions/transactions.txt",writtable_data, (err) => {
          if (err) console.log(err);
        });

	
var tailTransactionHash = txobj.hash;
iota.getBundle(tailTransactionHash)
  .then(bundle => {
   var message=JSON.parse(Extract.extractJson(bundle));
   console.log("Connector : from EdgeNode received : "+message.message);

 
 
 web3.eth.getAccounts().then(function (accounts){

web3.eth.sendTransaction({
    from: accounts[0],
    to: accounts[0],
    value: web3.utils.toHex(web3.utils.toWei('0', 'wei')), 
    data: web3.utils.asciiToHex(message.message), 
    gasPrice: web3.utils.asciiToHex(100000), 
    gasLimit:'0x2fefd8'
}).catch(err => {
    console.error(err);
  });;

console.log('Connector : Data sent as a transaction To Geth Node !');
});



   bundle=null;              
                
                
   
   
  })
  .catch(err => {
    console.error(err);
  });
 
});
