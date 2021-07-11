// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC777 seems to be an ERC20 compatible standard with a variety of improvements
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/token/ERC777/extensions/ERC777Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FundsManager is ERC777, ERC777Snapshot, Ownable {

    constructor(uint256 initialSupply, address[] memory defaultOperators)
        ERC777("TwitterPumpToken", "TPT", defaultOperators)
    {
      // Anything needs to happen here?
    }

    // https://developpaper.com/why-link-uses-erc-677-standard-to-issue-token/
    function onTokenTransfer(address from, uint256 amount, bytes data) returns (bool success) {
      // TODO: Switch address based on ENV https://docs.chain.link/docs/link-token-contracts/
      require(msg.sender == address(0xa36085F69e2889c224210F603D836748e7dC0088), "Invalid Token: Must be LINK");
      _mint(from, amount);
      // Record how much exists?
      // Transfer some to registry for keeper?
      return true;
    }

    // Snapshot Functionality
    function snapshot() public onlyOwner {
        _snapshot();
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC777, ERC777Snapshot)
    {
        super._beforeTokenTransfer(from, to, amount);
    }

}