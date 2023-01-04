const { ethers, upgrades } = require('hardhat');
const { expect } = require('chai');
const { generateProof } = require("./merkleUtils");
const { BigNumber } = require('ethers');


describe("Private Sale Contract", () => {

    let owner, account1, account2, account3, account4; 
    const supply = ethers.utils.parseUnits("100000000000000",6);
    const MAX_USDC_PER_WALLET = ethers.utils.parseUnits("1000",6);
    const AMOUNT_100_USDC = ethers.utils.parseUnits("100",6);
    const AMOUNT_900_USDC = ethers.utils.parseUnits("900",6);
    const AMOUNT_1000_USDC = ethers.utils.parseUnits("1000",6);
    const AMOUNT_1100_USDC = ethers.utils.parseUnits("1100",6);
    const rate = 1;
    
    beforeEach(async () => {
        [owner, account1, account2, account3, account4] = await ethers.getSigners();
        const arr = [owner, account1, account2, account3, account4];
        this.merkleInfo = generateProof(arr.map(addr => addr.address))
        const Token = await ethers.getContractFactory("Token"); 
        this.usdcInstance = await Token.deploy("USDC", "USDC", supply); 
        const PrivateSale = await ethers.getContractFactory("PrivateSale");
        this.privateSaleContract = await PrivateSale.deploy(this.usdcInstance.address);
        await this.usdcInstance.connect(account1).approve(this.privateSaleContract.address, supply);
        this.usdcInstance.transfer(account1.address, AMOUNT_1100_USDC) 
    });

    it("Faild to buy token if not in whitelist", async () => {
        await expect(this.privateSaleContract.connect(account1).buyRumToken("100", this.merkleInfo.proofs[1].proof))
            .to.be.revertedWith("You're not in whitelist"); 
    })

    //hot wallet will make this call which is owner of the contract
    it("Add account1 in whitelist in round 0", async ()=> {
        await this.privateSaleContract.connect(owner).whiteListUser(0, this.merkleInfo.rootHash);
        expect(await this.privateSaleContract.roundWiseWhitelist(0, account1.address, this.merkleInfo.proofs[1].proof)).to.be.true;
        expect(await this.privateSaleContract.roundWiseWhitelist(1, account1.address, this.merkleInfo.proofs[1].proof)).to.be.false;
    })
    
    it("Account1 faild with fake proof token", async () => { 
        await this.privateSaleContract.connect(owner).whiteListUser(0, this.merkleInfo.rootHash);
        await expect(this.privateSaleContract.connect(account1).buyRumToken("100", this.merkleInfo.proofs[0].proof))
        .to.be.revertedWith("You're not in whitelist"); 
    })

    it("Account1 buy token", async () => { 
        await this.privateSaleContract.connect(owner).whiteListUser(0, this.merkleInfo.rootHash);
        await this.privateSaleContract.connect(account1).buyRumToken(AMOUNT_100_USDC, this.merkleInfo.proofs[1].proof)
        expect((await this.usdcInstance.balanceOf(account1.address)).toString()).equal(AMOUNT_1000_USDC); 
    })

    it("Change Round number", async () => {
        await this.privateSaleContract.changeRound(1);
        expect((await this.privateSaleContract.currentRound()).toString()).to.be.equal("1");
    })

    it("Faild to buy token address is in whitelist for Round 0 but not in Round 1 ", async () => {
        await this.privateSaleContract.changeRound(1);
        await expect(this.privateSaleContract.connect(account1).buyRumToken("100", this.merkleInfo.proofs[1].proof))
            .to.be.revertedWith("You're not in whitelist"); 
    })

    
    //hot wallet will make this call which is owner of the contract
    it("Add account1 in whitelist in round 1", async ()=> {
        await this.privateSaleContract.changeRound(1);
        await this.privateSaleContract.connect(owner).whiteListUser(0, this.merkleInfo.rootHash);
        await this.privateSaleContract.connect(owner).whiteListUser(1, this.merkleInfo.rootHash);
        expect(await this.privateSaleContract.roundWiseWhitelist(0, account1.address, this.merkleInfo.proofs[1].proof)).to.be.true;
        expect(await this.privateSaleContract.roundWiseWhitelist(1, account1.address, this.merkleInfo.proofs[1].proof)).to.be.true;
    })

    it("Revert when exceed MAX_USDC_PER_WALLET", async () => { 
        await this.privateSaleContract.connect(owner).whiteListUser(0, this.merkleInfo.rootHash);
        await this.privateSaleContract.connect(account1).buyRumToken(AMOUNT_100_USDC, this.merkleInfo.proofs[1].proof)
        await this.privateSaleContract.changeRound(1);
        await this.privateSaleContract.connect(owner).whiteListUser(1, this.merkleInfo.rootHash);
        await this.privateSaleContract.connect(account1).buyRumToken(AMOUNT_900_USDC, this.merkleInfo.proofs[1].proof)
        expect((await this.usdcInstance.balanceOf(account1.address)).toString()).equal(AMOUNT_100_USDC); 
        await expect(this.privateSaleContract.connect(account1).buyRumToken("100", this.merkleInfo.proofs[1].proof))
        .to.be.revertedWith("Exceeds limit."); 
    })

    
})