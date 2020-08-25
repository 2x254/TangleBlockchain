const zmq = require('zeromq');
fs = require("fs");
const sock = zmq.socket('sub');
const transaction_converter= require('@iota/transaction-converter');
sock.connect('tcp://localhost:5556');
sock.subscribe('tx_trytes');

console.log("listening...");

sock.on('message', msg => {
  const data = msg.toString().split(' ');
 dataobject= transaction_converter.asTransactionObject(data[1]);
 writtable_data=JSON.stringify(dataobject,null,4);
 console.log(dataobject);
 
  fs.appendFile("C:/iota/TangleBlockchainPlatform/fullnodeTransactions/transactions.txt",writtable_data, (err) => {
          if (err) console.log(err);
        
                  }); 
  
  
});

