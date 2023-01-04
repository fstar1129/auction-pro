pragma solidity ^0.8.17;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";

contract PrivateSale is Ownable, Pausable{

    enum Round {
        Round0,
        Round1
    }

    event TokensReseravtion(address userAddress, Round round, uint256 date, uint256 amountTransfered);
    event MekleRootAdded(bytes32 root, Round round);

    uint256 immutable public MAX_USDC_PER_WALLET; 
    Round public currentRound;
    IERC20Metadata public usdc;   
    mapping(Round => mapping(address => uint256)) public totalUsdcTransfer;
    mapping(Round => mapping(bytes32 => bool)) public merkleRoots;

    constructor(address _usdc) {
        usdc = IERC20Metadata(_usdc); 
        MAX_USDC_PER_WALLET = 1000 * (10 ** usdc.decimals());
        currentRound = Round.Round0; 
    }

    function changeRound(Round newRound) external onlyOwner {
        currentRound = newRound;
    }

    function whiteListUser(Round round, bytes32 root) external onlyOwner {
        merkleRoots[round][root] = true;
        emit MekleRootAdded(root, round);
    }

    function roundWiseWhitelist(Round round, address account, bytes32[] memory proof) external view returns(bool) {
         bytes32 root = MerkleProof.processProof(proof, keccak256(abi.encodePacked(account)));
        return merkleRoots[round][root];
    }

    function buyRumToken(uint256 amountOfUsdc, bytes32[] memory proof) external whenNotPaused { 
        bytes32 root = MerkleProof.processProof(proof, keccak256(abi.encodePacked(msg.sender)));
        require(merkleRoots[currentRound][root], "You're not in whitelist");
        uint256 totalPurchaseByUser =  totalUsdcTransfer[Round.Round0][msg.sender] + totalUsdcTransfer[Round.Round1][msg.sender];
        require(totalPurchaseByUser + amountOfUsdc <= MAX_USDC_PER_WALLET, "Exceeds limit.");
        require(usdc.transferFrom(msg.sender, address(this), amountOfUsdc));  
        totalUsdcTransfer[currentRound][msg.sender] += amountOfUsdc;
        emit TokensReseravtion(msg.sender, currentRound, block.timestamp, amountOfUsdc);
    }

    function withdrawUsdcToken(address acount, uint256 amount)
        external
        onlyOwner
    {
        usdc.transfer(acount, amount);
    }

   function pause() public onlyOwner {
        _pause();
    }

    function unPause() public onlyOwner {
        _unpause();
    }

}