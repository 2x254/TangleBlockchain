
const BN = require('bn.js');
//var VM = require('ethereumjs-vm').default;
//var abi = require('ethereumjs-abi');
const fs = require('fs');
const solc = require('solc');
var ganache = require("ganache-cli");

//var Pudding = require('ether-pudding');
var Web3 = require('web3');
class SolidityRunner
{
  executeSolidity_fromFile(path,methode,cons_params,v_c,return_type)
    {
const input = fs.readFileSync(path);


const output = solc.compile(input.toString(),1);

var contract_name=Object.keys(output.contracts)[0].toString().slice(1);

var bytecode=output.contracts[':'+contract_name].bytecode;

var ABI= output.contracts[':'+contract_name].interface;

var web3;

web3=new Web3();
//ganache.provider()
//"http://localhost:8545"
web3.setProvider(ganache.provider());

web3.eth.getAccounts().then(function (accounts){
              
var argHex = web3.utils.asciiToHex(cons_params);

var myContract= new web3.eth.Contract(JSON.parse(ABI));

//var contAdd=myContract.new({data: bytecode,arguments: [argHex]});



var Mytransaction=myContract.deploy({data: bytecode,arguments: [argHex]});
//console.log(Mytransaction)
console.log(myContract.adress);
//APPEL à des fonctions
Mytransaction.send({from: accounts[0],gas: 1000000}).then(function(instance){
    if(v_c==="viewer")
    {
        if(return_type==="String")
        {
    console.log("solidity successfully  runned !");
    eval("instance.methods."+methode+".call().then(function(result){return web3.utils.hexToAscii(result)}).then((result)=>console.log(result))");
           }
           else
           {
         console.log("solidity successfully  runned !");
         eval("instance.methods."+methode+".call().then((result)=>console.log(result))");
           }    
        }
    else if (v_c==="changer")
    {
    console.log("solidity successfully  runned !");    
    eval("instance.methods."+methode+".send({from : accounts[0] })");
      }
     else
    console.log("you should specify your type of methode changer or viewer");   /*
   console.log("solidity successfully  runned !");
   instance.methods.add().send({from : accounts[0] }).then(function(monres){
   instance.methods.getCounter().call().then(function(res){
   console.log(res);    
   instance.methods.add().send({from : accounts[0] }).then(function(res){
   instance.methods.getCounter().call().then((result) => console.log(result))
   
   });    
       
   }); 
       
   });
    */
   });
   

});

}
executeSolidity_from_bytecode(bytecode,ABI,methode,cons_params,v_c,return_type)
{
var web3;

web3=new Web3();

web3.setProvider(ganache.provider());

web3.eth.getAccounts().then(function (accounts){
              
var argHex = web3.utils.asciiToHex(cons_params);

var myContract=new web3.eth.Contract(JSON.parse(ABI));
   
var Mytransaction=myContract.deploy({data: bytecode,arguments: [argHex]});
// appel des fonctions
Mytransaction.send({from: accounts[0],gas: 1000000}).then(function(instance){
    if(v_c==="viewer")
    {
    
    if(return_type==="String")
        {
    console.log("solidity successfully  runned !");
    eval("instance.methods."+methode+".call().then(function(result){return web3.utils.hexToAscii(result)}).then((result)=>console.log(result))");
           }
           else
           {
         console.log("solidity successfully  runned !");
         eval("instance.methods."+methode+".call().then((result)=>console.log(result))");
           }
    
     }
    else if (v_c==="changer")
    {
    console.log("solidity successfully  runned !");    
    eval("instance.methods."+methode+".send({from : accounts[0] })");
      }
     else
    console.log("you should specify your type of methode changer or viewer");   

   });
   

});    
    
   
}





}
//sr=new SolidityRunner();
//sr.executeSolidity_fromFile('C:/iota/TangleBlockchainPlatform/src/Blockchain/contracts/Calculator.sol','addition(5,8)','','viewer',"");
//sr.executeSolidity_fromFile('C:/iota/TangleBlockchainPlatform/src/Blockchain/contracts/Hello.sol','renderHelloWorld()','bonjour motaz','viewer',"String");
module.exports = SolidityRunner;









//   instance.methods.add().call().then((result) => console.log(result))
   
//instance.methods.getCounter().call().then((result) => console.log(result))
//console.log(contractInstance.emit()); 
//hellotx._parent.methods.getCounter().call({from :'0xfeffd8da8c11acc9d82bb315906f62c494024f54'})


//instance._parent.methods.getCounter().call().then((result) => console.log(web3.utils.hexToAscii(result)))
//hellotx._parent.methods.getCounter().then((result) => console.log(web3.utils.hexToAscii(result)));


















//console.log(ABI);
/*
var data=abi.methodID('getCounter',[]).toString('hex');
console.log(data);
console.log(output)
const vm = new VM();

vm.on('step', function(data) {
  console.log(`Opcode: ${data.opcode.name}\tStack: ${data.stack}`)
})

vm.runCode({
  code: Buffer.from(bytecode,'hex'),
  
  gasLimit: new BN(0xffff),
})
  .then(results => {
    console.log('Returned : ' + results.returnValue);
    console.log('gasUsed  : ' + results.gasUsed.toString());

  })
  .catch(err => console.log('Error    : ' + err))


*/


























/*

*/

/*



*/
