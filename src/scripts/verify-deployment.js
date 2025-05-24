
// Script pour vérifier le déploiement sur VeegoxChain
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function verifyDeployment() {
  console.log("🔍 Vérification du déploiement sur VeegoxChain...\n");
  
  const [deployer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  
  console.log("Network:", network.name, "Chain ID:", network.chainId);
  console.log("Deployer:", deployer.address);
  console.log("Balance:", ethers.utils.formatEther(await deployer.getBalance()), "VEX\n");
  
  // Load addresses
  const addressesPath = path.join(__dirname, "../contracts/addresses.json");
  const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf8"));
  const chainAddresses = addresses.veegoxchain;
  
  const contracts = {};
  const results = [];
  
  try {
    // Load contract instances
    console.log("📦 Chargement des contrats...");
    
    if (chainAddresses.VEXToken) {
      const VEXToken = await ethers.getContractFactory("VEXToken");
      contracts.vexToken = VEXToken.attach(chainAddresses.VEXToken);
      console.log("✅ VEXToken chargé");
    }
    
    if (chainAddresses.VeegoxTreasury) {
      const VeegoxTreasury = await ethers.getContractFactory("VeegoxTreasury");
      contracts.treasury = VeegoxTreasury.attach(chainAddresses.VeegoxTreasury);
      console.log("✅ VeegoxTreasury chargé");
    }
    
    if (chainAddresses.GovernanceVEX) {
      const GovernanceVEX = await ethers.getContractFactory("GovernanceVEX");
      contracts.gVexToken = GovernanceVEX.attach(chainAddresses.GovernanceVEX);
      console.log("✅ GovernanceVEX chargé");
    }
    
    if (chainAddresses.VeegoxStaking) {
      const VeegoxStaking = await ethers.getContractFactory("VeegoxStaking");
      contracts.staking = VeegoxStaking.attach(chainAddresses.VeegoxStaking);
      console.log("✅ VeegoxStaking chargé");
    }
    
    if (chainAddresses.VeegoxDAO) {
      const VeegoxDAO = await ethers.getContractFactory("VeegoxDAO");
      contracts.dao = VeegoxDAO.attach(chainAddresses.VeegoxDAO);
      console.log("✅ VeegoxDAO chargé");
    }
    
    console.log("\n🧪 Tests de fonctionnalité...");
    
    // Test VEX Token
    if (contracts.vexToken) {
      const name = await contracts.vexToken.name();
      const symbol = await contracts.vexToken.symbol();
      const totalSupply = await contracts.vexToken.totalSupply();
      const deployerBalance = await contracts.vexToken.balanceOf(deployer.address);
      
      results.push(`VEX Token: ${name} (${symbol})`);
      results.push(`Supply totale: ${ethers.utils.formatEther(totalSupply)} VEX`);
      results.push(`Balance déployeur: ${ethers.utils.formatEther(deployerBalance)} VEX`);
      console.log("✅ VEX Token fonctionne");
    }
    
    // Test Treasury
    if (contracts.treasury) {
      const owner = await contracts.treasury.owner();
      const vexToken = await contracts.treasury.vexToken();
      
      results.push(`Treasury Owner: ${owner}`);
      results.push(`Treasury VEX Token: ${vexToken}`);
      console.log("✅ Treasury fonctionne");
    }
    
    // Test Governance Token
    if (contracts.gVexToken) {
      const name = await contracts.gVexToken.name();
      const symbol = await contracts.gVexToken.symbol();
      
      results.push(`Governance Token: ${name} (${symbol})`);
      console.log("✅ Governance Token fonctionne");
    }
    
    // Test Staking
    if (contracts.staking) {
      const stakingToken = await contracts.staking.stakingToken();
      const rewardToken = await contracts.staking.rewardToken();
      
      results.push(`Staking Token: ${stakingToken}`);
      results.push(`Reward Token: ${rewardToken}`);
      console.log("✅ Staking fonctionne");
    }
    
    // Test DAO
    if (contracts.dao) {
      const governanceToken = await contracts.dao.governanceToken();
      
      results.push(`DAO Governance Token: ${governanceToken}`);
      console.log("✅ DAO fonctionne");
    }
    
    console.log("\n🎉 Vérification terminée avec succès!");
    console.log("\n📋 Résumé:");
    results.forEach(result => console.log(`   ${result}`));
    
    return true;
    
  } catch (error) {
    console.error("❌ Erreur lors de la vérification:", error);
    return false;
  }
}

if (require.main === module) {
  verifyDeployment()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { verifyDeployment };
