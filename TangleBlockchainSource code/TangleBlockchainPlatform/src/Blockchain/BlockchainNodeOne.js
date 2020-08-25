 
global.fs = require("fs");
global.Block = require('./Block');
global.Blockchain=require('./Blockchain');
global.montableau=[];
var now = require("performance-now");
//const perf = require('execution-time')();
const solc = require('solc');
global.ConnecteurBlockchain = require('/iota/TangleBlockchainPlatform/src/ConnecteurBlockchain');
const socket = require(`zmq`).socket(`pull`);   
global.dgram = require('dgram');
 var isJSON = require('is-json');
global.dgramSender=require('dgram');
'use strict';
//let iyem = require('iyem');

class BlockchainNodeOne
{   
   

RunNodeOne(){
//var sleep = require('sleep');
var t0 = now();
var msg;
var binded=false;
var datatab=[];
global.index=0;
global.blockToSend=0;
global.entier=10;
global.totalblocks=1;
global.bytecode="";
global.ABI="";
const sleep = require('sleep-promise');
var jsonContent;
console.time('timer1');
//perf.start();//starting code timer 
global.mychain= new global.Blockchain([' ']);
 

console.log('Node-One: checking for data persistance...');
var contents = global.fs.readFileSync("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json"); 
    if(isJSON(contents.toString())===true)
    {
jsonContent = JSON.parse(contents);
var jsonContentString=JSON.stringify(jsonContent);
//console.log(jsonContentString)
    
 if((jsonContentString.includes('"hash"'))&&(jsonContentString.includes('"index"'))&&(jsonContentString.includes('"nonce"'))&&(jsonContentString.includes('"timestamp"'))&&(jsonContentString.includes('"previoushash"'))&&(jsonContentString.includes('"mrkl_root"'))&&(jsonContentString.includes('"tx"'))&&(jsonContentString.includes('"bytecode"'))&&(jsonContentString.includes('"abi"')))
 {
  console.log('Node-One: Data still exist.');
  console.log('Node-One: checking validation of the blockchain...');
  global.mychain.setBlockchain(jsonContent.chain);   
  if(global.mychain.isBlockchainValid()===true)
  {
   console.log('Node-One: blockchain is valid');  
  global.lastblock=global.mychain.getLastestBlock();
  console.log('Node-one: lastest block mined : '+global.lastblock.hash);
  global.index=parseInt(global.lastblock.index,10);
  global.entier=parseInt(global.lastblock.timestamp,10);
  global.totalblocks=global.index+1; 
                     
                     
                     
  }
  else{   
      console.log('Node-One: blockchain not valid');
      console.log('Node-One: initializing our blockchain...');
      global.mychain= new global.Blockchain(['genesis']);
      var jsonchain=JSON.stringify(global.mychain,null,4);  
      global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsonchain, (err) => {
          if (err) console.log(err);
        console.log("Node-One: Genesis block written");
                  });   
     
        }
  
 }
 else{ 
     console.log('Node-one: not a Blockchain');
     console.log('Node-One: initializing our blockchain...');
     global.mychain= new global.Blockchain(['genesis']);
      var jsonchain=JSON.stringify(global.mychain,null,4);  
      global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsonchain, (err) => {
          if (err) console.log(err);
        console.log("Node-One: Genesis block written");
                  });
     
 
             }
 
}
else{
    console.log('Node-one: not JSON Format');
    console.log('Node-One: initializing our blockchain...');
     global.mychain= new global.Blockchain(['genesis']);
      var jsonchain=JSON.stringify(global.mychain,null,4);  
      global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsonchain, (err) => {
          if (err) console.log(err);
        console.log("Node-One: Genesis block written");
                  });
     /*
       var PORT = 33336;
      var HOST = '127.0.0.1';
     var genesis_buffer= new Buffer(global.mychain);
      	console.log('Node-One: Sending genesis block to Node-Tow');
	var client = global.dgramSender.createSocket('udp4');
        client.send(genesis_buffer, 0, genesis_buffer.length, PORT, HOST, function(err, bytes) {
        if (err) throw err;
        console.log('Node-One: Genesis Block sent to node tow with adress and port : ' + HOST +':'+ PORT);
        client.close();
});
  */  
         }

var t1=now();
var temp_ecoule=(t1-t0)/1000;
 //console.log(temp_ecoule);
 setInterval(function(){
  temp_ecoule=temp_ecoule+10;
  var temp_minute=temp_ecoule/60;
 console.log('Node-One: Listening...');
 console.log('Node-One: Time passing to create block in minutes: '+temp_minute);
console.log('Node-One: Total Blocks now = '+global.totalblocks);
  if(temp_minute>=10)
  {   
    
      if(datatab.length > 0)
      {
       
        global.index++;
        var monblock=new Block(global.index,datatab,'',global.bytecode,global.ABI);
    //   var block_buffer = JSON.stringify(monblock);
        global.mychain.addBlock(monblock);
        global.entier=global.entier+10;
        
        global.blockToSend++;
        global.totalblocks++;
        console.log('Node-One: Total Blocks = '+global.totalblocks);
       // console.log('Node-One: number of blocks sent = '+global.blockToSend);
        var jsondata=JSON.stringify(global.mychain,null,4);    
        global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsondata, (err) => {
          if (err) console.log(err);
        console.log("Node-One: file written with success :) ");
                  });    
          datatab=[];   
          temp_ecoule=0;   
         
          }
          else{
       temp_ecoule=0;        
          } 
         
      }
      
      
      
  
 var PORT = 33332;
 var HOST = '127.0.0.1';


var server = global.dgram.createSocket('udp4');

server.on('listening', function() {
  var address = server.address();
 console.log('Node-One: blockchain node one listening  from connector on  ' + address.address + ':' + address.port);
});

server.on('message', function(message, remote){
 msg=message.toString('utf8');
 
 
if(msg !==null)
 { 
 if(msg.includes("FIOTA")===true)
  { console.log('Node-One: this data is from iota');
    msg=msg.substring(0,msg.length-5);
    if(global.montableau.includes(msg))
    {
        console.log('Node-One: This data  was sent from me  sorry it will be not stored !');
        global.montableau=[];
    }
    else
    {
 console.log('Node-One: from '+remote.address + ':' + remote.port +' - ' +' data received: '+ msg);
 
//var PORT = 33336;
//var HOST = '127.0.0.1';


        
	message = msg;
        datatab.push(message);
        console.log('Node-One: '+message+'  Stored');
        
        if(datatab.length===10)
        {
        global.index++;
       var monblock=new Block(global.index,datatab,'',global.bytecode,global.ABI);
        global.mychain.addBlock(monblock);
        global.entier=global.entier+10;
        global.blockToSend++;
        global.totalblocks++;
        console.log('Node-One: Total Blocks = '+global.totalblocks);
        var jsondata=JSON.stringify(global.mychain,null,4);    
        global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsondata, (err) => {
          if (err) console.log(err);
        console.log("Node-One: file written with success :) ");
                  });    
          datatab=[];
          
            }
            
    }
 }

 else if(msg.includes("SOLID")===true)
 {  //receive data
   var donnrecue=msg.split('$');
   //console.log(donnrecue);
   msg=donnrecue[4];
  // console.log('Node-One: from '+remote.address + ':' + remote.port +' - ' +' data received: '+ ); 
   console.log("Node-One: "+msg);
   global.montableau.push(msg);
   console.log('Node-One: this was solidity code !');
     
    //compile data
  const output = solc.compile(msg.toString(),1);

var contract_name=Object.keys(output.contracts)[0].toString().slice(1);

global.bytecode=output.contracts[':'+contract_name].bytecode;

global.ABI= output.contracts[':'+contract_name].interface;

datatab.push(msg);

global.index++;

var blocksol=new Block(global.index,datatab,'',global.bytecode,global.ABI);

global.mychain.addBlock(blocksol);

global.entier=global.entier+10;
global.blockToSend++;
global.totalblocks++;
console.log('Node-One: Total Blocks = '+global.totalblocks);
  var jsondata=JSON.stringify(global.mychain,null,4);    
  global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json", jsondata, (err) => {
          if (err) console.log(err);
        console.log("Node-One: file written with success :) ");
                }); 
  var SolidityRunner=require('./SolidityRunner');              
  
 var sr =new SolidityRunner();
 
 console.log('Node-One: executing smart-contract...');
 sr.executeSolidity_from_bytecode(global.bytecode,global.ABI,donnrecue[0],donnrecue[1],donnrecue[2],donnrecue[3]);

console.log('Node-One: diffusing data to iota ');

//const conbciota =new ConnecteurBlockchain(global.bytecode.toString()+global.ABI.toString());
const conbceth =new ConnecteurBlockchain(msg);
conbceth.Send_data_From_Blockchain_to_Iota();    
 datatab=[];
 }
 
  }
 else
 {
 console.log('       ');
 }
 
});

if(binded===false)
{
server.bind(PORT, HOST);
binded=true;
}

}, 10000); 

}

}
nodeone = new BlockchainNodeOne();
nodeone.RunNodeOne();
module.exports = BlockchainNodeOne;















