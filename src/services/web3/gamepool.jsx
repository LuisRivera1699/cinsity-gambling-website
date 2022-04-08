import { ethers } from "ethers";
import { GAME_POOL_CONTRACT_ABI, GAME_POOL_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, WRLD_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const getFunds = async (setFunds) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gamePoolContract = new ethers.Contract(GAME_POOL_CONTRACT_ADDRESS, GAME_POOL_CONTRACT_ABI, signer);

            let funds = await gamePoolContract.getMyDeposit();
            let converted = ethers.utils.formatEther(funds.toString());
            setFunds(converted);

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const addFunds = async (amount) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const gamePoolContract = new ethers.Contract(GAME_POOL_CONTRACT_ADDRESS, GAME_POOL_CONTRACT_ABI, signer);
            const wrldContract = new ethers.Contract(WRLD_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, signer);

            let approveTxn = await wrldContract.approve(GAME_POOL_CONTRACT_ADDRESS, ethers.utils.parseEther(`${amount}`));

            await approveTxn.wait();
            console.log("Successfully approved NFTWorlds contract to transfer the $WRLD amount set.");

            let addFundsTxn = await gamePoolContract.deposit(ethers.utils.parseEther(`${amount}`));

            await addFundsTxn.wait();
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}