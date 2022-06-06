import { ethers } from "ethers";

export const signMessage = async (msg, hashIt) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
        
            let toSign;

            if (hashIt) {
                const msgHash = ethers.utils.id(msg);
                toSign = ethers.utils.arrayify(msgHash);                
            } else {
                toSign = msg;
            }

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const flatSignature = await signer.signMessage(toSign);
            
            return flatSignature;
        
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }   
}