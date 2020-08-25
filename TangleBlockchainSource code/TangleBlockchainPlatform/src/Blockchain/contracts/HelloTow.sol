             
			 
	   pragma solidity ^0.4.0;

           contract HelloTow {
 
              uint256 counter=51;

             function add() public constant returns (uint256) {  //increases counter by 1
                  counter++;
                   return counter;
                         }
 
            function subtract() public constant returns (uint256){ //decreases counter by 1
                 counter--;
                 return counter;
                         }
 
            function getCounter() public constant returns (uint256) {
                 return counter;
                  } 
                      }