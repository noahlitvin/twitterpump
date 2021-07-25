// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.6/interfaces/KeeperCompatibleInterface.sol";

contract StockMonitor is KeeperCompatibleInterface {

    uint public lastTimeStamp;
    uint public immutable interval;

    AggregatorV3Interface internal priceFeed;
    uint internal lastPrice;

    constructor() public {
      interval = 86400; // Check upkeep daily (seconds per day)
      lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(bytes calldata checkData) external override returns (bool upkeepNeeded, bytes memory performData) {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata performData) external override {
        lastTimeStamp = block.timestamp;
        checkStock('AAPL');
        checkStock('TSLA');
        checkStock('GOOGL');
    }

    function checkStock(string ticker) internal {
        // Switch based on ticker param
        // https://docs.chain.link/docs/get-the-latest-price/
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();

        // If the price increased by more than 5%...
        if (lastPrice && lastPrice < price - (lastPrice / 20)) {
            // https://market.link/adapters/9ebb251e-1d7c-433d-9835-d771996f5b9c?network=1
            // Tweet: "Bullish on $" + ticker + "!"
        }

    }
}
