const Block = require('./Block');
const fs = require("fs");
class Blockchain {
    constructor(data)
    {
     this.chain=[this.createGenesisBlock(data)];   
            
    } 
  createGenesisBlock(data)
  {
   return new Block(0,data,'','','');   
      
  }
  
  getGenesisBlock()
  {
      
   return this.chain[0]  
  }
   getFirstBlock()
  {
      
   return this.chain[1]  
  }
  
  
  
  getLastestBlock()
  {
      
      return this.chain[this.chain.length-1];
  }
 addBlock(newBlock) 
 {
    newBlock.previoushash=this.getLastestBlock().hash;
    newBlock.mineBlock(4);
    this.chain.push(newBlock);
 }
 
 isBlockchainValid()
 {
     for(let i=1;i<this.chain.length;i++)
     {
    const blockcourant=this.chain[i];
    const blockprecedant=this.chain[i-1];
     //if(blockcourant.hash!==blockcourant.calculateHash())
    // { return false;}
     if(blockcourant.previoushash!==blockprecedant.hash){ return false;}
         
     }
  return true;   
 }
 Write_to_file(data)
 {
var jsondata=JSON.stringify(data,null,4);    
  fs.writeFile("C:/iota/TangleBlockchainPlatform/database/Blockchain_data.json",jsondata, (err) => {
  if (err) console.log(err);
  console.log("fichier bien écrit.");
});   
          
 }
 Read_from_JSON_File(path)
{
fs.readFile(path, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err)
        return;
    }
return jsonString;
//console.log(JSONchain);     
});

}
 setBlockchain(chain)
 {
     
     this.chain=chain; }
 
}


 
module.exports = Blockchain;