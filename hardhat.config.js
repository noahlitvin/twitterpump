/**
 * @type import('hardhat/config').HardhatUserConfig
 */

require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');
require('hardhat-abi-exporter');
require('dotenv').config();

const { MAINNET_API_URL, MAINNET_PRIVATE_KEY, KOVAN_API_URL, KOVAN_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.0",
  abiExporter: {
    path: './data/abi',
    clear: true
  },
  networks: {
     hardhat: {},
     mainnet: {
        url: MAINNET_API_URL,
        accounts: [`0x${MAINNET_PRIVATE_KEY}`]
     },
     kovan: {
        url: KOVAN_API_URL,
        accounts: [`0x${KOVAN_PRIVATE_KEY}`]
     }
  }
};
