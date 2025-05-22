
import { ethers } from "ethers";
import { BlockchainService } from "./blockchain-service";
import addressesJson from "../contracts/addresses.json";

// Import contract ABIs
import VEXTokenABI from "../contracts/abis/VEXToken.json";
import GovernanceVEXABI from "../contracts/abis/GovernanceVEX.json";
import VeegoxTreasuryABI from "../contracts/abis/VeegoxTreasury.json";
import VeegoxStakingABI from "../contracts/abis/VeegoxStaking.json";
import VeegoxDAOABI from "../contracts/abis/VeegoxDAO.json";
import StableVEXABI from "../contracts/abis/StableVEX.json";

// Define contract addresses by network
type NetworkAddresses = {
  [contract: string]: string;
};

type ContractAddresses = {
  [network: string]: NetworkAddresses;
};

const contractAddresses: ContractAddresses = addressesJson;

// Contract ABIs
const contractABIs: { [key: string]: any } = {
  VEXToken: VEXTokenABI,
  GovernanceVEX: GovernanceVEXABI,
  VeegoxTreasury: VeegoxTreasuryABI,
  VeegoxStaking: VeegoxStakingABI,
  VeegoxDAO: VeegoxDAOABI,
  StableVEX: StableVEXABI,
};

export const ContractService = {
  /**
   * Gets a contract instance for the specified contract and network
   */
  getContract(contractName: string, network: string = "ethereum"): ethers.Contract | null {
    try {
      const provider = BlockchainService.getProvider(network);
      const networkAddresses = contractAddresses[network] || contractAddresses.ethereum;
      const address = networkAddresses[contractName];
      
      if (!address || address === "") {
        console.error(`No address found for ${contractName} on ${network}`);
        return null;
      }
      
      const abi = contractABIs[contractName];
      if (!abi) {
        console.error(`No ABI found for ${contractName}`);
        return null;
      }
      
      return new ethers.Contract(address, abi, provider);
    } catch (error) {
      console.error(`Error getting ${contractName} contract:`, error);
      return null;
    }
  },
  
  /**
   * Gets a contract with signer for write operations
   */
  getContractWithSigner(contractName: string, signer: ethers.Signer, network: string = "ethereum"): ethers.Contract | null {
    try {
      const networkAddresses = contractAddresses[network] || contractAddresses.ethereum;
      const address = networkAddresses[contractName];
      
      if (!address || address === "") {
        console.error(`No address found for ${contractName} on ${network}`);
        return null;
      }
      
      const abi = contractABIs[contractName];
      if (!abi) {
        console.error(`No ABI found for ${contractName}`);
        return null;
      }
      
      return new ethers.Contract(address, abi, signer);
    } catch (error) {
      console.error(`Error getting ${contractName} contract with signer:`, error);
      return null;
    }
  },
  
  /**
   * Updates contract addresses from deployment
   */
  updateContractAddress(contractName: string, address: string, network: string = "ethereum"): void {
    if (!contractAddresses[network]) {
      contractAddresses[network] = {};
    }
    contractAddresses[network][contractName] = address;
  },
  
  /**
   * Gets all contract addresses for a network
   */
  getContractAddresses(network: string = "ethereum"): NetworkAddresses {
    return contractAddresses[network] || {};
  }
};
