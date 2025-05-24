
// Deployment script spécifique pour VeegoxChain
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Déploiement des contrats Veegox sur VeegoxChain...\n");
  
  const [deployer] = await ethers.getSigners();
  console.log("Compte de déploiement:", deployer.address);
  
  // Vérifier le solde du déployeur
  const balance = await deployer.getBalance();
  console.log("Solde du compte:", ethers.utils.formatEther(balance), "VEX\n");
  
  if (balance.lt(ethers.utils.parseEther("1"))) {
    console.warn("⚠️  Attention: Solde faible pour le déploiement\n");
  }
  
  // Load addresses file
  const addressesPath = path.join(__dirname, "../contracts/addresses.json");
  const addresses = JSON.parse(fs.readFileSync(addressesPath, "utf8"));
  
  // Create deployment log
  const deploymentLog = [];
  const deploymentResults = {};
  
  try {
    console.log("📦 Déploiement du token VEX...");
    const VEXToken = await ethers.getContractFactory("VEXToken");
    const vexToken = await VEXToken.deploy(deployer.address);
    await vexToken.deployed();
    
    console.log(`✅ VEXToken déployé: ${vexToken.address}`);
    deploymentLog.push(`VEXToken: ${vexToken.address}`);
    addresses.veegoxchain.VEXToken = vexToken.address;
    deploymentResults.VEXToken = vexToken.address;
    
    console.log("\n💰 Déploiement de la Treasury...");
    const VeegoxTreasury = await ethers.getContractFactory("VeegoxTreasury");
    const treasury = await VeegoxTreasury.deploy(deployer.address, vexToken.address);
    await treasury.deployed();
    
    console.log(`✅ VeegoxTreasury déployé: ${treasury.address}`);
    deploymentLog.push(`VeegoxTreasury: ${treasury.address}`);
    addresses.veegoxchain.VeegoxTreasury = treasury.address;
    deploymentResults.VeegoxTreasury = treasury.address;
    
    // Configuration du token VEX
    console.log("\n🔧 Configuration du token VEX...");
    await vexToken.setTreasury(treasury.address);
    console.log("Treasury configurée dans le token VEX");
    
    console.log("\n🗳️  Déploiement du token de gouvernance gVEX...");
    const GovernanceVEX = await ethers.getContractFactory("GovernanceVEX");
    const gVexToken = await GovernanceVEX.deploy(deployer.address);
    await gVexToken.deployed();
    
    console.log(`✅ GovernanceVEX déployé: ${gVexToken.address}`);
    deploymentLog.push(`GovernanceVEX: ${gVexToken.address}`);
    addresses.veegoxchain.GovernanceVEX = gVexToken.address;
    deploymentResults.GovernanceVEX = gVexToken.address;
    
    console.log("\n🥩 Déploiement du contrat de staking...");
    const VeegoxStaking = await ethers.getContractFactory("VeegoxStaking");
    const staking = await VeegoxStaking.deploy(
      deployer.address,
      vexToken.address,
      gVexToken.address,
      treasury.address
    );
    await staking.deployed();
    
    console.log(`✅ VeegoxStaking déployé: ${staking.address}`);
    deploymentLog.push(`VeegoxStaking: ${staking.address}`);
    addresses.veegoxchain.VeegoxStaking = staking.address;
    deploymentResults.VeegoxStaking = staking.address;
    
    // Configuration du staking
    console.log("\n🔧 Configuration du staking...");
    await gVexToken.setStakingContract(staking.address);
    await treasury.setStakingContract(staking.address);
    console.log("Contrat de staking configuré");
    
    console.log("\n🏛️  Déploiement de la DAO...");
    const VeegoxDAO = await ethers.getContractFactory("VeegoxDAO");
    const dao = await VeegoxDAO.deploy(deployer.address, gVexToken.address);
    await dao.deployed();
    
    console.log(`✅ VeegoxDAO déployé: ${dao.address}`);
    deploymentLog.push(`VeegoxDAO: ${dao.address}`);
    addresses.veegoxchain.VeegoxDAO = dao.address;
    deploymentResults.VeegoxDAO = dao.address;
    
    // Configuration de la DAO
    console.log("\n🔧 Configuration de la DAO...");
    await gVexToken.setDAOContract(dao.address);
    await treasury.setDAOContract(dao.address);
    console.log("DAO configurée");
    
    // Save updated addresses
    fs.writeFileSync(addressesPath, JSON.stringify(addresses, null, 2));
    console.log("\n📝 Adresses mises à jour dans addresses.json");
    
    // Create deployment log file
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    const logPath = path.join(__dirname, `../deployments/veegoxchain_${timestamp}.log`);
    
    // Ensure deployments directory exists
    const deploymentsDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentsDir)){
      fs.mkdirSync(deploymentsDir);
    }
    
    const deploymentSummary = `
🎉 Déploiement réussi sur VeegoxChain!
Réseau: VeegoxChain (Chain ID: 1999)
Timestamp: ${new Date().toISOString()}
Déployeur: ${deployer.address}

📋 Adresses des contrats:
${deploymentLog.join('\n')}

🔗 Liens utiles:
- Block Explorer: http://localhost:4000
- RPC URL: http://localhost:10002

✅ Tous les contrats sont déployés et configurés avec succès!
    `;
    
    fs.writeFileSync(logPath, deploymentSummary);
    console.log("📁 Log de déploiement sauvegardé:", logPath);
    
    console.log("\n" + deploymentSummary);
    
    return deploymentResults;
    
  } catch (error) {
    console.error("❌ Erreur de déploiement:", error);
    process.exit(1);
  }
}

// Execute deployment
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { main };
