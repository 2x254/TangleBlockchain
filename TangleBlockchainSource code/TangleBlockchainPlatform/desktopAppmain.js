


const electron = require('electron');
const path = require('path');
const url = require('url');
var ipc = require('electron').ipcMain;


const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({width: 1000, height: 800, 
      webPreferences: {
nodeIntegration: true
}
  
    
    });
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes:true
  }));
 

}); 

 const notifyBtn = document.getElementById('notifyBtns');
 
notifyBtn.addEventListener('click', function (event) {
    
   const Iota = require('@iota/core');
const Converter = require('@iota/converter');
const generate = require('iota-generate-seed');


 const { Board, Thermometer } = require("johnny-five");
const board = new Board();
var counter=1;
board.on("ready", () => {

  const thermometer = new Thermometer({
    controller: "DS18B20",
    pin: 8,
    freq: 10000
  });

  thermometer.on("change", () => {
    const {celsius} = thermometer;
    var data="  Temperature : "+celsius.toString()+"\n";
   document.getElementById('areaId').value=data;
   $("")
   const iota = Iota.composeAPI({
  provider: 'http://localhost:14265'
});
const depth = 3;
const minimumWeightMagnitude = 14;
const seed =  generate();
const address = 'HEQLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWORLDHELLOWOR99D';
var madonne={"message":data.toString()};
const message = JSON.stringify(madonne);

// Convert the message to trytes
const messageInTrytes = Converter.asciiToTrytes(message);

const transfers = [
  {
    value: 0,
    address: address,
    message: messageInTrytes
  }
];

iota
  .prepareTransfers(seed, transfers)
  .then(trytes => {
    return iota.sendTrytes(trytes, depth, minimumWeightMagnitude);
  })
  .then(bundle => {
   mainWindow.loadURL(url.format({ pathname: path.join(__dirname, 'index.html')})).document.getElementById('areaId').value="Sender : Data number "+counter+" : "+madonne.message+"  sent to The Tangle and it's hash is : "+bundle[0].hash;
    counter++;
  })
  .catch(err => {
    console.error(err)
  });

  
  });
}); 
    
 
})

 
  
  
  
  
  
  
  
