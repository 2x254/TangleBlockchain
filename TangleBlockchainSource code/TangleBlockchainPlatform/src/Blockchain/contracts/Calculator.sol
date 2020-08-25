pragma solidity ^0.4.0;
contract Calculator {
function addition(uint a, uint b) public pure returns(uint) {
    return a + b;
}
function subtraction(uint a, uint b) public pure returns(uint) {
return a — b;
}
function multiplication(uint a, uint b) public pure returns(uint) {
return a * b;
}
function division(uint a, uint b) public pure returns(uint) {
return a / b;
}
}