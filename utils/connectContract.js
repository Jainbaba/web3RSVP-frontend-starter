import abiJson from "./web3rsvp.json";
import { ethers } from "ethers";

function connectContract() {
  const contractAddress = 0xd0654bf5c6d3de57875a6edd71fd6943466851a9;
  const contractABI = abiJson.abi;
  let rsvpContract;
  try {
    const { eth } = window;
    if (eth) {
      const provider = new ethers.providers.Web3Provider(eth);
      const signer = provider.getSigner();
      rsvpContract = new ethers.Contract(contractAddress, contractABI, signer);
    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
  return rsvpContract;
}
export default connectContract;
