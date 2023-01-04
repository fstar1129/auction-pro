// @dev. This script will deploy pFLASK contracts

const { BigNumber } = require('@ethersproject/bignumber')
const { ethers } = require('hardhat')
const hre = require("hardhat");



async function main() {

    const [deployer] = await ethers.getSigners()
    const Auctionv1 = await ethers.getContractFactory("Auctionv1");
    this.AuctionsContract = await upgrades.deployProxy(Auctionv1, ["0x28cE73C497FB15754148048d061cd108C5100186"])
    console.log(`Auction contract: ${this.AuctionsContract.address}`);
}

main()
    .then(() => process.exit())
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
