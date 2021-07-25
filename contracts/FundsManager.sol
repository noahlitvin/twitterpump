pragma solidity ^0.8.0;

// ERC777 is an ERC20 compatible standard with a variety of improvements
import "@openzeppelin/contracts/token/ERC777/ERC777.sol";
import "@openzeppelin/contracts/token/ERC777/extensions/ERC777Snapshot.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract KeeperRegistry { // This doesn't have to match the real contract name. Call it what you like.
  function addFunds(uint256 id, uint96 amount); // No implementation, just the function signature. This is just so Solidity can work out how to call it.
  function getKeeperInfo(address query)
    external view returns (
      address payee,
      bool active,
      uint96 balance
    );
}

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

      // Issues TPT (twitterpumptoken) to record how much has been donated by addresses
      // Could add 'governance layer' to allow modifications for majority token holders
      _mint(from, amount);

      // https://docs.chain.link/docs/chainlink-keepers/register-upkeep/#how-funding-works
      KeeperRegistry keeper_registry = KeeperRegistry('KEEPER_REGISTRY_ADDRESS');
      keeper_registry.addFunds('MY_REGISTRY_ID', amount);

      return true;
    }

    // Snapshot Functionality for TPT
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