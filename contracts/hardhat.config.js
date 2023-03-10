require('@atixlabs/hardhat-time-n-mine')
require('@nomiclabs/hardhat-etherscan')
require('dotenv').config()
const { ethers } = require('ethers')
require('@openzeppelin/hardhat-upgrades');
require("@nomicfoundation/hardhat-chai-matchers")

const dev = process.env.DEV_PRIVATE_KEY
const prod = process.env.PROD_PRIVATE_KEY

module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.8.0',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.1',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: '0.8.17',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    mumbai: {
      url: 'https://matic-mumbai.chainstacklabs.com',
      accounts: dev ? [dev] : dev,
    },
    matic: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/2xb1hySVAh9Sz5C-loghXbHe6NH-BWTU",
      accounts: prod ? [prod] : prod,
    },

    bsctestnet: {
      url: 'https://data-seed-prebsc-2-s2.binance.org:8545',
      accounts: dev ? [dev] : dev,
      gas: 2100000,
      gasPrice: 10000000000, //ethers.utils.parseUnits('1.2', 'gwei').toNumber(),
    },
  },
  etherscan: {
    // apiKey: "T4A58D6AI7PPUBT8IXP16PSQY9V67WJ41R"
    apiKey: "TRG7E3JX6GJI6XKYIXNC7F353VXGJG84R1"
  },
  mocha: {
    timeout: 5 * 60 * 10000,
  },
}
