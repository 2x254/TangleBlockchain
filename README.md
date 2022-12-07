# TangleBlockchain

This platform combine tow different technology Tangle ledger and  Blockchain ledger. using connector that works as gateway. It' s transfert data  issued  from  Tangle node to Blockchain node 
To download Blockchain node you should use Geth node as software this is the link : https://geth.ethereum.org/downloads/
For data test i used  DS18B20 as sensor you need to dowload file named ConfigrableFirmata to be able to use the sensor. This is the link : https://github.com/firmata/ConfigurableFirmata
 how to run the plateform
 1) first you should run the tangle nodes (fullnode and edgenode).  these are jar files  using java -jar command (java 8 need be installed first)
 2) run Geth node  using needed commands ( documentation :  https://geth.ethereum.org/docs/ )
 3) run  file named connector.js   using node command ( node js need to be installed)
 4) now you install you  sensor ds18b20  you deploy the configrableFirmata file  using arduino uno app, then you can run  file named DS18B20_sensor.js. If you don't have ds18b20 sensor  you can run file generate data randomly( named DataSender.js)
 5) you see now data stored on both tangle and Blockchain ledger.
 6) you can use  dashboard to see validated transactions  stored on Geth node (  it was react project named BlockchainVisualiser. You need install react  using npm install ....) 
 
