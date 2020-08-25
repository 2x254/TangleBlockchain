import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {ReactDOM} from 'react'
import JSONPretty from 'react-json-pretty';
var JSONPrettyMon = require('react-json-pretty/dist/monikai');
var DEFAULT_PORT = process.env.PORT || 5000;



const useStyles = makeStyles({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


function App() {

  const [res,setRes] = useState(null)
const [resone,setResOne] = useState(null)
const [restow,setRestow]=useState(null)
const [resthree,setResthree]=useState(null)

const styleBlockchain = {backgroundColor : '#303030', color :'#FFFFFF',display:'inlineBlock'};

  const classes = useStyles();

  useEffect(() => {
  
 const fs =require('fs');
var Web3 = require('web3');
var Promise = require('promise');
var web3;
web3=new Web3();
web3.setProvider("http://localhost:8280");       
   
  
const interval = setInterval(function(){
     web3.eth.getAccounts().then(function (accounts){
 //web3.eth.getTransactionCount(accounts[0]).then((n) =>{setRes(res =>'Visualizer : Transactions count : '+n );  })   
});

async function GetBlock(i){
  var Block = await web3.eth.getBlock(i);
  return Block;
}



var blocks=[];
var tabhashes=[];
var transactions=[];





web3.eth.getBlockNumber().then((n) =>{
setResOne(resone =>'Total-Blocks : '+n);

    for(var i = 0; i < n; i++){
      blocks.push(GetBlock(i));
     // web3.eth.getTransaction(GetBlock(i).hash.toString()).then((tx)=>{ if(tx!==null) { transactions.push(tx)}});
      }
    Promise.all(blocks).then((value)=>{
     if (value !== null)
        {
    
      value.forEach((element)=> {
        tabhashes.push(element);  
        //web3.eth.getTransactionFromBlock(element.number).then((tx)=>{ if(tx!==null) { transactions.push(tx)}});
       //web3.eth.getTransaction(element.hash).then((tx)=>{ if(tx!==null) { transactions.push(tx)}});
        element.transactions.forEach((tx)=> {transactions.push('tx: '+tx+'\n')});
               });
           setRestow(restow => JSON.stringify(tabhashes,"",4).split(",").toString().substr(1).substring(0, JSON.stringify(tabhashes,"",4).split(",").toString().substr(1).length - 1))
           setResthree(resthree=>transactions.join(''));
           setRes(res =>'Mined-Transactions-in-Blocks : '+transactions.length);
           
           }
           else
           {
             
             
           }
    });
  }); 

  }, 3000);
   
   
   
   
   
  return () => clearInterval(interval) ;  
  }, []);


  return (
    <div className="App">

        
      {res && (
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="black" gutterBottom>
             
    <h1>Blockchain-DashBoard</h1>
            
            
            
            
            
        </Typography>
            <Typography variant="h5" component="h2">

       
            
            
            </Typography>
          </CardContent>
          <CardActions>
          
          </CardActions>
          <table>
          <tr>
          <td>  <h3>{resone}</h3></td>
          <td>   <h3>{res}</h3>  </td>
    
    
    </tr>
          <tr align="left">
    <td>  <textarea   name="body" cols="96"   style={styleBlockchain} rows="29" value= {restow}/> </td>
    <td> <textarea   name="body" cols="89"   style={styleBlockchain} rows="29" value= {resthree}/>   </td>
    </tr>
    
    
    </table>     
    
      
         
        </Card>
        
      )}
      
    
     
       
     
    </div>
            
          
            
            
  );
 
}

export default App;
