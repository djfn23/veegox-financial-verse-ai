
// Deployment script for Veegox contracts
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  const network = hre.network.name;
  console.log(`Beginning deployment of Veegox contracts to ${network}...`);
  
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  // Load addresses file
  const addressesPath = path.join(__dirname, "../contracts/addresses.json");
  const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf8"));
  
  // Create a log for this deployment
  const deploymentLog = [];
  
  try {
    // Deploy VEX Token
    const VEXToken = await ethers.getContractFactory("VEXToken");
    const vexToken = await VEXToken.deploy(deployer.address);
    await vexToken.deployed();
    console.log("VEXToken deployed to:", vexToken.address);
    deploymentLog.push(`VEXToken: ${vexToken.address}`);
    addresses[network].VEXToken = vexToken.address;
    
    // Deploy Treasury
    const VeegoxTreasury = await ethers.getContractFactory("VeegoxTreasury");
    const treasury = await VeegoxTreasury.deploy(deployer.address, vexToken.address);
    await treasury.deployed();
    console.log("VeegoxTreasury deployed to:", treasury.address);
    deploymentLog.push(`VeegoxTreasury: ${treasury.address}`);
    addresses[network].VeegoxTreasury = treasury.address;
    
    // Set treasury in VEX token
    await vexToken.setTreasury(treasury.address);
    console.log("Set treasury address in VEX token");
    
    // Deploy gVEX Token
    const GovernanceVEX = await ethers.getContractFactory("GovernanceVEX");
    const gVexToken = await GovernanceVEX.deploy(deployer.address);
    await gVexToken.deployed();
    console.log("GovernanceVEX deployed to:", gVexToken.address);
    deploymentLog.push(`GovernanceVEX: ${gVexToken.address}`);
    addresses[network].GovernanceVEX = gVexToken.address;
    
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
    deploymentLog.push(`VeegoxStaking: ${staking.address}`);
    addresses[network].VeegoxStaking = staking.address;
    
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
    deploymentLog.push(`VeegoxDAO: ${dao.address}`);
    addresses[network].VeegoxDAO = dao.address;
    
    // Set DAO contract in gVEX token
    await gVexToken.setDAOContract(dao.address);
    console.log("Set DAO contract in gVEX token");
    
    // Set DAO contract in treasury
    await treasury.setDAOContract(dao.address);
    console.log("Set DAO contract in treasury");
    
    // Note: Save StableVEX for later when we have price feed addresses
    console.log("StableVEX will be deployed in a separate step with price feed addresses");
    
    // Save updated addresses
    fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
    console.log("Contract addresses updated in addresses.json");
    
    // Create deployment log file
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logPath = path.join(__dirname, `../deployments/${network}_${timestamp}.log`);
    
    // Ensure deployments directory exists
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)){
      fs.mkdirSync(deploymentsDir);
    }
    
    fs.writeFileSync(
      logPath, 
      `Deployment to ${network} at ${new Date().toISOString()}\n\n${deploymentLog.join('\n')}`
    );
    
    console.log("Deployment log saved to", logPath);
    console.log("Deployment complete!");
    
  } catch (error) {
    console.error("Deployment error:", error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
