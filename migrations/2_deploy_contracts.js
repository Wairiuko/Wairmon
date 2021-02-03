const W3arts = artifacts.require("W3arts");

module.exports = function(deployer) {
  deployer.deploy(W3arts);
};
/*const W3irds = artifacts.require("w3irds");

module.exports = function(deployer) {
  deployer.deploy(W3irds);
};
const W3irdsTokens = artifacts.require("W3irdsTokens");

module.exports = function(deployer) {
  deployer.deploy(W3irdsTokens);
};*/
const W3irdsTokens = artifacts.require('W3irdsTokens');
 
const { deployProxy } = require('@openzeppelin/truffle-upgrades');
 
module.exports = async function (deployer) {
  await deployProxy(W3irdsTokens, [42], { deployer, initializer: 'store' });
};
/*const ArtProject = artifacts.require("ArtProject");

module.exports = function(deployer) {
  deployer.deploy(ArtProject);
};
const ArtProjectBase = artifacts.require("ArtProjectBase");

module.exports = function(deployer) {
  deployer.deploy(ArtProjectBase);
};
const ProgressiveProject = artifacts.require("ProgressiveProject");

module.exports = function(deployer) {
  deployer.deploy(ProgressiveProject);
};
const CompletedProject = artifacts.require("CompletedProject");

module.exports = function(deployer) {
  deployer.deploy(CompletedProject);
};*/


