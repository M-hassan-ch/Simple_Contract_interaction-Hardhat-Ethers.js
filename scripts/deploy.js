// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // 1. Get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory('Greeter');
  console.log('Deploying Greeter...');

  // 2. Instantiating a new Greeter smart contract
  const contract = await Greeter.deploy("iam deployed");

  // 3. Waiting for the deployment to resolve
  await contract.deployed();

  // 4. Use the contract instance to get the contract address
  console.log('Greeter deployed to:', contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });