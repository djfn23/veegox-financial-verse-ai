
// Script to extract ABIs from compiled contracts
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    console.log("Extracting ABIs from compiled contracts...");
    
    // Path to artifacts directory (generated after compilation)
    const artifactsDir = path.join(__dirname, "../artifacts/contracts");
    
    // Path to save ABIs
    const abiDir = path.join(__dirname, "../contracts/abis");
    
    // Create ABIs directory if it doesn't exist
    if (!fs.existsSync(abiDir)) {
      fs.mkdirSync(abiDir, { recursive: true });
    }
    
    // Contracts to extract ABIs for
    const contracts = [
      "VEXToken",
      "StableVEX",
      "GovernanceVEX",
      "VeegoxTreasury",
      "VeegoxStaking",
      "VeegoxDAO",
      "VeegoxLending"
    ];
    
    // Extract ABIs
    for (const contractName of contracts) {
      // Path to contract artifact JSON
      const artifactPath = path.join(artifactsDir, `${contractName}.sol`, `${contractName}.json`);
      
      // Check if artifact exists
      if (fs.existsSync(artifactPath)) {
        console.log(`Extracting ABI for ${contractName}...`);
        
        // Read artifact JSON
        const artifact = JSON.parse(fs.readFileSync(artifactPath));
        
        // Extract ABI
        const abi = artifact.abi;
        
        // Save ABI to file
        fs.writeFileSync(
          path.join(abiDir, `${contractName}.json`),
          JSON.stringify(abi, null, 2)
        );
        
        console.log(`ABI for ${contractName} extracted successfully.`);
      } else {
        console.warn(`Artifact for ${contractName} not found at ${artifactPath}`);
      }
    }
    
    console.log("ABI extraction complete!");
  } catch (error) {
    console.error("Error extracting ABIs:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
