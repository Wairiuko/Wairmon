require('babel-register');
require('babel-polyfill');
require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraProjectId = process.env.INFURA_PROJECT_ID;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          process.env.DEV_MNEMONIC, // Array of account private keys
          `wss://rinkeby.infura.io/ws/v3/${infuraProjectId}`// Url to an Ethereum Node
        )
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4,
      networkCheckTimeOut: 20000,
      timeoutBlocks: 200
    },
    
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.7.6",
      optimizer: {
        enabled: true,
        runs: 200
      }
    
    }
  }
}