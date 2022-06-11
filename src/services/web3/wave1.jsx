import { ethers } from "ethers";
import { W1_CONTRACT_ABI, W1_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const getWave1Balance = async (address, setWave1Balance) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }],
            });

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const w1Contract = new ethers.Contract(W1_CONTRACT_ADDRESS, W1_CONTRACT_ABI, signer);

            let wave1Balance = await w1Contract.balanceOf(address);

            setWave1Balance(wave1Balance.toNumber());

            await ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x13881' }],
            });

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        throw error;
    }
}