const Migrations = artifacts.require("Migrations");
const Feed = artifacts.require("Feed");
const Bank = artifacts.require("Bank");

module.exports = function (deployer) {
  deployer.deploy(Feed);
  deployer.deploy(Bank);
};
