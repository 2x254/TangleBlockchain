



let iyem = require('iyem');
 var sleep = require('sleep');  

global.datablockchain=null;

let udpBlockchainListener= iyem.create(function(){ 
 
 var udpreceiver = require('dgram');   
 var PORT = 33339;
var HOST = '127.0.0.1';   

var server = udpreceiver.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
 console.log('                           | listening on ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote) {
 console.log("                           | data received: "+remote.address + ':' + remote.port +' - ' + message);
     if(message !==null){
     global.datablockchain=message;

        }
 
});

server.bind(PORT, HOST);

});





let mqttIOTAWorkerListener= iyem.create(function(){
fs = require("fs");  
  

global.zmq = require('zeromq');
global.sock = global.zmq.socket('sub');

global.sock.connect('tcp://localhost:5556');
global.sock.subscribe('tx_trytes');
const sender=require('dgram');  
const transaction_converter= require('@iota/transaction-converter');
const converter=require('@iota/converter');
console.log("waiting edge node ...");
global.sock.on('message', msg => {
    
    if(msg !==null)
    {
    
 const data = msg.toString().split(' ');
 dataobject= transaction_converter.asTransactionObject(data[1]);
 writtable_data=JSON.stringify(dataobject,null,4);
 console.log(writtable_data);
   fs.appendFile("C:/iota/TangleBlockchainPlatform/fullnodeTransactions/transactions.txt",writtable_data, (err) => {
          if (err) console.log(err);
        
                  }); 
     

      
            

 var databuff=new Buffer(writtable_data+'FIOTA'); 
  var PORT = 33332;
 var HOST = '127.0.0.1';
 console.log('sending to blockchain');
	var client = sender.createSocket('udp4');
        client.send(databuff, 0, databuff.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('Connector: Data Sent to Blockchain: ' + HOST +':'+ PORT);
        client.close();
       
});


 msg=null; 
 
    }
  

});

});
//udpBlockchainListener.start();
mqttIOTAWorkerListener.start();
