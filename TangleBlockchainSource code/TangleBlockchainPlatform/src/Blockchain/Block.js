
const SHA256 = require('crypto-js/sha256');
const merkle = require('merkle');

class Block
{
    
 constructor(index,data,previoushash,bytecode,abi)   
 {
  this.index=index;
  this.timestamp=Math.floor(Date.now() / 1000);//timestamp in seconds
 // this.data=data;
  this.mrkl_root=this.calculateMerkleRoot(data);
  this.tx=this.calculateTXdata(data);//liste des transaction
  this.previoushash=previoushash;
  this.bytecode=bytecode;
  this.abi=abi;
  this.hash=this.calculateHash();  
  this.nonce=0;
 }
 
 
 
 calculateHash()
 {
  return SHA256(this.index + this.previoushash + this.timestamp+this.nonce+this.mrkl_root+this.bytecode+this.abi).toString();   
     
 }
 
 mineBlock(difficulty)
 {
 while(this.hash.substring(0,difficulty)!==Array(difficulty+1).join("0"))
 {
   this.nonce++;
    this.hash=this.calculateHash(); 
 }    
 console.log("Block mined : "+this.hash); 
 }
 calculateMerkleRoot(donne)
 {//var tableau= Array.from(donne)
    // var tableau =[];
  //tableau.push(donne)
     var tree = merkle('sha256',false).sync(donne);
   return tree.root();
   
 }
 calculateTXdata(donne)   
 {
 // var tableau =[];
  //tableau.push(donne)
     var tree = merkle('sha256',false).sync(donne);
   return tree.level(tree.levels()-1);   
     
 }
 GetBytecode()
 {
     return this.bytecode;
 }
 GetAbi()
 {    
  return this.abi;      
 }
}

module.exports = Block;
