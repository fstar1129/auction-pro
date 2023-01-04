// @dev. This script will deploy pFLASK contracts

const { BigNumber } = require('@ethersproject/bignumber')
const { ethers } = require('hardhat')
const hre = require("hardhat");



async function main() {

    const [deployer] = await ethers.getSigners()

    // this.rumContract = await (await ethers.getContractFactory("Token")).deploy("RUM", "RUM", "10000000000000000000000000");
    // this.usdcContract = await (await ethers.getContractFactory("Token")).deploy("USDC", "USDC","10000000000000000000000000");
    console.log("deployer " + deployer.address)
    const Auctionv1 = await ethers.getContractFactory("Auctionv1");
    const instance = await upgrades.deployProxy(Auctionv1, [deployer.address])
    await instance.deployed();
    console.log("Auction contract: ", instance.address);
    // console.log(`RUM contract: ${this.rumContract.address}`);
    // console.log(`USDC contract: ${this.usdcContract.address}`);
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
