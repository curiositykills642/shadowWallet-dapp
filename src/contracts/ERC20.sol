// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol";

contract TESTToken is ERC20 {
    constructor() ERC20("TEST Token", "ITT") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }
}
