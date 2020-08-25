
const fs =require('fs');
const express = require('express')
var Web3 = require('web3');
var Promise = require('promise');
var web3;
web3=new Web3();
web3.setProvider("http://localhost:8280");
  
setInterval(function(){
console.log('Blockchain-Writer : Checking for new Blocks... ');
 
async function GetBlock(i){
  var Block = await web3.eth.getBlock(i);
  return Block;
}

var blocks=[];
web3.eth.getBlockNumber().then((n) =>{
 console.log('Blockchain-Writer : Total-Blocks : '+n);
   
    for(i = 0; i < n; i++)
      blocks.push(GetBlock(i));
    Promise.all(blocks).then((value)=>{
     if (value !== null)
        {
     fs.writeFile("C:/iota/TangleBlockchainPlatform/database/BlockchainGeth.json",JSON.stringify(value,null,4), (err) => {
          if (err)
              console.log(err);
          
           }); 
           }
           else
           {
              console.log("Blockchain-Writer : No Block ");
             
           }
    });
  }); 

  }, 3000);









/*
web3.eth.getAccounts().then(function (accounts){
/console.log(accounts)
web3.eth.sendTransaction({from: accounts[0],to: accounts[0],value: web3.utils.toHex(web3.utils.toWei('0', 'wei')) , data: web3.utils.asciiToHex('hello world'), gasPrice: web3.utils.asciiToHex(100000), gasLimit:'0x2fefd8'});
console.log('Connector : Data sent as a transaction To Geth Node !');
});
console.log('Connector : Writing Blocks to File.... ');
// get blocks from Geth Node 
var blocks=[];
web3.eth.getBlockNumber().then((n) =>{
   console.log(n);
    for(i = 0; i < n; i++)
      blocks.push(GetBlock(i));
    Promise.all(blocks).then((value)=>{
     if (value !== null)
        {
     fs.writeFile("C:/iota/TangleBlockchainPlatform/database/BlockchainGeth.json",JSON.stringify(value,null,4), (err) => {
          if (err)console.log(err);
           }); 
           } 
    });
  });


   */  

 
