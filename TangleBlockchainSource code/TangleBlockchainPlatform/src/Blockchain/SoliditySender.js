const fs = require('fs');

class SoliditySender
{  
   sendSolidityCode_To_Blockchain(path,methode,cons_params,v_c,return_type,tag)     
   {
  
const input = fs.readFileSync(path);   
 
var PORT = 33332;

var HOST = '127.0.0.1';

var dgram = require('dgram');

var message = new Buffer(methode+"$"+cons_params+"$"+v_c+"$"+return_type+"$"+input+"$"+tag);//run  ou bien  deploy

console.log('Client-Sender: data-to-send: '+input);

//console.log(input);

var client = dgram.createSocket('udp4');

client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
  if (err) throw err;
 
  client.close();
});    
     
   }
}
sender=new SoliditySender();

//sender.sendSolidityCode_To_Blockchain('C:/iota/TangleBlockchainPlatform/src/Blockchain/contracts/HelloTow.sol','getCounter()','500','viewer',"",'SOLID');
sender.sendSolidityCode_To_Blockchain('C:/iota/TangleBlockchainPlatform/src/Blockchain/contracts/HelloTow.sol','add()','','viewer',"",'SOLID');
module.exports = SoliditySender;






