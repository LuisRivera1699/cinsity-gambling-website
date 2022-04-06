import { ethers } from "ethers";
import { PLAYER_MANAGER_CONTRACT_ABI, PLAYER_MANAGER_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const getUserNickname = async (address, setNickname) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const playerManagerContract = new ethers.Contract(PLAYER_MANAGER_CONTRACT_ADDRESS, PLAYER_MANAGER_CONTRACT_ABI, signer);

            let nickname = await playerManagerContract.getNickName(address);

            setNickname(nickname);

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const setUserNickname = async (nickname, update, setNickname) => {
    try {
        const { ethereum } = window;

        if (ethereum) {

            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const playerManagerContract = new ethers.Contract(PLAYER_MANAGER_CONTRACT_ADDRESS, PLAYER_MANAGER_CONTRACT_ABI, signer);

            let setNicknameTxn;

            if (update) {
                setNicknameTxn = await playerManagerContract.updatePlayer(nickname);
            } else {
                setNicknameTxn = await playerManagerContract.registerPlayer(nickname);
            }

            await setNicknameTxn.wait();

            setNickname(nickname);

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}