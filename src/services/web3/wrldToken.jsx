import { ethers } from "ethers";
import { WRLD_CONTRACT_ABI, WRLD_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const getWrldFunds = async (address, setFunds) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wrldContract = new ethers.Contract(WRLD_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, signer);

            let balance = await wrldContract.balanceOf(address);
            let converted = ethers.utils.formatEther(balance.toString());

            setFunds(converted);
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const addWrldFunds = async (amount, address) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wrldContract = new ethers.Contract(WRLD_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, signer);

            let transferTxn = await wrldContract.transfer(address, ethers.utils.parseEther(`${amount}`));

            await transferTxn.wait(); 
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}