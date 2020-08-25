pragma solidity ^0.4.0;

contract Hello {
string hello;

    constructor(string memory _hello) public {
        hello = _hello;
    }

 function renderHelloWorld () public view returns (string memory) {
   return hello;
 }
}