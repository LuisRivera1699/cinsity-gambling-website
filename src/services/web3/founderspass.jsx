import { ethers } from "ethers";
import { FP_CONTRACT_ABI, FP_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const getFoundersPassBalances = async (address, setPassesBalances) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const fpContract = new ethers.Contract(FP_CONTRACT_ADDRESS, FP_CONTRACT_ABI, signer);

            let wave2Balance = await fpContract.balanceOf(address, 0);
            let wave3Balance = await fpContract.balanceOf(address, 1);

            setPassesBalances([wave2Balance.toNumber(), wave3Balance.toNumber()]);
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}