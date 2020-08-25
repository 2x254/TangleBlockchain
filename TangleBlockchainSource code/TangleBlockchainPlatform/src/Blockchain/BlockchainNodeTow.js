global.fs = require("fs");
global.Block = require('./Block');
global.Blockchain=require('./Blockchain');
var dgram = require('dgram');
var isJSON = require('is-json');
//let iyem = require('iyem'); 
 class BlockchainNodeTow{
    
 RunNodeTow()
 {

 global.blockreceived1=0;
 global.index1=1;
 global.entier1=10;
 global.totalblock=1;
 var jsonContent;
 //console.log('Node-Tow: initializing our blockchain...');
 global.mychain1= new Blockchain([' ']);
 
   setInterval(function() {
       
  

 console.log('Node-Tow: Synchronnizing....');
var contents = global.fs.readFileSync("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeOne.json"); 
    if(isJSON(contents.toString())===true)
    {
jsonContent = JSON.parse(contents);
 var jsonContentString=JSON.stringify(jsonContent);   
    
 if((jsonContentString.includes('"hash"'))&&(jsonContentString.includes('"index"'))&&(jsonContentString.includes('"nonce"'))&&(jsonContentString.includes('"timestamp"'))&&(jsonContentString.includes('"previoushash"'))&&(jsonContentString.includes('"mrkl_root"'))&&(jsonContentString.includes('"tx"'))&&(jsonContentString.includes('"bytecode"'))&&(jsonContentString.includes('"abi"')))
 {
  
  global.mychain1.setBlockchain(jsonContent.chain);   
  if(global.mychain1.isBlockchainValid()===true)
  {
   console.log('Node-Tow: blockchain is valid');  
  global.lastblock1=global.mychain1.getLastestBlock();
  console.log('Node-Tow: lastest block mined : '+global.lastblock1.hash);
  global.index1=parseInt(global.lastblock1.index,10);
 // global.entier1=parseInt(global.lastblock1.timestamp,10)+10;
  global.totalblock=global.index1+1; 
  console.log('Node-Tow: Total blocks: '+global.totalblock);
  //ecriture dans l'autre fichier
  var jsondata=JSON.stringify(global.mychain1,null,4);    
        global.fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_dataNodeTow.json", jsondata, (err) => {
          if (err) console.log(err);
       // console.log("Node-One: file written with success :) ");
                  });                
  }
 }
 
 
}


 }, 10000); 

     }

 }  
 nodetow =  new BlockchainNodeTow();
 nodetow.RunNodeTow();
module.exports =BlockchainNodeTow;





   
        
            
        

