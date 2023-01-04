// @dev. This script will deploy pFLASK contracts

const { BigNumber } = require('@ethersproject/bignumber')
const { ethers, upgrades } = require('hardhat');
const hre = require("hardhat");



async function main() {
    const [deployer] = await ethers.getSigners()
    console.log(deployer.address)
    console.log("Account balance:", (await deployer.getBalance()).toString());
    const Auctionv6 = await ethers.getContractFactory("Auctionv6");
    const instance = await upgrades.upgradeProxy("0x6Bf9aa5c86CDAce7581e9834bB6205F80f17Bb23", Auctionv6)
    //const impl1 = await ethers.getContractFactory("Auctionv3")
    //upgrades.forceImport("0xC535d62904E4D0daa3bBE9e608446bcfAE7fE35B", impl1);
    //const instance = await upgrades.upgradeProxy("0xC535d62904E4D0daa3bBE9e608446bcfAE7fE35B", Auctionv6)
    console.log(instance.deployTransaction.hash)
    console.log("Auction contract: ", instance.address);

    //await instance.setTimeExtendOnBid(60*60);
} 
main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })



