
// Deployment script for Veegox contracts
const { ethers } = require("hardhat");

async function main() {
  console.log("Beginning deployment of Veegox contracts...");
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  
  // Deploy VEX Token
  const VEXToken = await ethers.getContractFactory("VEXToken");
  const vexToken = await VEXToken.deploy(deployer.address);
  await vexToken.deployed();
  console.log("VEXToken deployed to:", vexToken.address);
  
  // Deploy Treasury
  const VeegoxTreasury = await ethers.getContractFactory("VeegoxTreasury");
  const treasury = await VeegoxTreasury.deploy(deployer.address, vexToken.address);
  await treasury.deployed();
  console.log("VeegoxTreasury deployed to:", treasury.address);
  
  // Set treasury in VEX token
  await vexToken.setTreasury(treasury.address);
  console.log("Set treasury address in VEX token");
  
  // Deploy gVEX Token
  const GovernanceVEX = await ethers.getContractFactory("GovernanceVEX");
  const gVexToken = await GovernanceVEX.deploy(deployer.address);
  await gVexToken.deployed();
  console.log("GovernanceVEX deployed to:", gVexToken.address);
  
  // Deploy Staking Contract
  const VeegoxStaking = await ethers.getContractFactory("VeegoxStaking");
  const staking = await VeegoxStaking.deploy(
    deployer.address,
    vexToken.address,
    gVexToken.address,
    treasury.address
  );
  await staking.deployed();
  console.log("VeegoxStaking deployed to:", staking.address);
  
  // Set staking contract in gVEX token
  await gVexToken.setStakingContract(staking.address);
  console.log("Set staking contract in gVEX token");
  
  // Set staking contract in treasury
  await treasury.setStakingContract(staking.address);
  console.log("Set staking contract in treasury");
  
  // Deploy DAO Contract
  const VeegoxDAO = await ethers.getContractFactory("VeegoxDAO");
  const dao = await VeegoxDAO.deploy(deployer.address, gVexToken.address);
  await dao.deployed();
  console.log("VeegoxDAO deployed to:", dao.address);
  
  // Set DAO contract in gVEX token
  await gVexToken.setDAOContract(dao.address);
  console.log("Set DAO contract in gVEX token");
  
  // Set DAO contract in treasury
  await treasury.setDAOContract(dao.address);
  console.log("Set DAO contract in treasury");
  
  // Note: sVEX and Lending contracts require additional setup with external dependencies
  // like price feeds, so those would be deployed in a separate step
  
  console.log("Deployment complete!");
  console.log("Next steps: Deploy sVEX and Lending contracts with appropriate price feed addresses");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
