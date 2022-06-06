import { ethers } from "ethers"
import { WEB32FA_CONTRACT_ABI, WEB32FA_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const checkIfHasSignature = async (setHasSignature) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const web32FAContract = new ethers.Contract(WEB32FA_CONTRACT_ADDRESS, WEB32FA_CONTRACT_ABI, signer);

            let mySignature = await web32FAContract.getMySignature();

            setHasSignature(mySignature !== "0x");
        
        } else {
            alert("Man, go and get Metamask!");
        }

    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const setSignature = async (hasSignature, newSignature) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const web32FAContract = new ethers.Contract(WEB32FA_CONTRACT_ADDRESS, WEB32FA_CONTRACT_ABI, signer);

            let setSignatureTxn;

            if (hasSignature) {
                setSignatureTxn = await web32FAContract.updatePassword2FASignature(newSignature);
            } else {
                setSignatureTxn = await web32FAContract.createPassword2FASignature(newSignature);
            }

            await setSignatureTxn.wait();

        } else {
            alert("Man, go and get Metamask!");
        }

    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const validateSignature = async (address, signature) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const web32FAContract = new ethers.Contract(WEB32FA_CONTRACT_ADDRESS, WEB32FA_CONTRACT_ABI, signer);

            let isValid = await web32FAContract.checkSignature(address, signature);

            console.log(isValid);
        
        } else {
            alert("Man, go and get Metamask!");
        }

    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}
