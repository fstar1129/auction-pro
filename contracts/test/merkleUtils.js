
const {MerkleTree} = require("merkletreejs")
const keccak256 = require("keccak256")
const ethers = require('ethers');

const generateProof = (addresses) => {  
    let leaves = addresses.map((address) => ethers.utils.solidityKeccak256(["address"], [address]));

    let merkleTree = new MerkleTree(leaves, keccak256, {sortPairs: true});
    let rootHash = merkleTree.getRoot().toString('hex') 
    const proofs = addresses.map(address => {
        return {
            account: address,
            proof: merkleTree.getProof(keccak256(address)).map(ele=>"0x"+ele.data.toString('hex'))
        }
    });
    return {
        rootHash: `0x${rootHash}`,
        proofs
    }
}

module.exports = {
    generateProof
}