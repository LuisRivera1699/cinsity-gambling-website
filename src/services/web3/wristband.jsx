import { ethers } from "ethers";
import { AGE_VERIFICATION_CONTRACT_ABI, AGE_VERIFICATION_CONTRACT_ADDRESS, WRISTBAND_WRLD_PRICE, WRLD_CONTRACT_ABI, WRLD_CONTRACT_ADDRESS } from "../../utils/constants/contracts";

export const checkIfUserHasWristband = async (address) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wbContract = new ethers.Contract(AGE_VERIFICATION_CONTRACT_ADDRESS, AGE_VERIFICATION_CONTRACT_ABI, signer);

            let addressBalance = await wbContract.balanceOf(address, 0);

            let balanceNumber = addressBalance.toNumber();

            return balanceNumber > 0;
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const mintWristband = async () => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wbContract = new ethers.Contract(AGE_VERIFICATION_CONTRACT_ADDRESS, AGE_VERIFICATION_CONTRACT_ABI, signer);
            const wrldContract = new ethers.Contract(WRLD_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, signer);

            let approveTxn = await wrldContract.approve(AGE_VERIFICATION_CONTRACT_ADDRESS, ethers.utils.parseEther(`${WRISTBAND_WRLD_PRICE}`));

            await approveTxn.wait();
            console.log("Successfully approved NFTWorlds contract to transfer the $WRLD amount set.");

            let mintTxn = await wbContract.mintWb();

            await mintTxn.wait();
            console.log("Successfully minted Age Verification Wristband");

        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const getWristbandRenewDate = async (address, setRenewDate) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wbContract = new ethers.Contract(AGE_VERIFICATION_CONTRACT_ADDRESS, AGE_VERIFICATION_CONTRACT_ABI, signer);

            let wbRenewDate = await wbContract.getRenewDate(address);
            setRenewDate(wbRenewDate.mul(1000).toNumber());
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}

export const updateRenewDate = async (address) => {
    try {
        const { ethereum } = window;

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const wbContract = new ethers.Contract(AGE_VERIFICATION_CONTRACT_ADDRESS, AGE_VERIFICATION_CONTRACT_ABI, signer);
            const wrldContract = new ethers.Contract(WRLD_CONTRACT_ADDRESS, WRLD_CONTRACT_ABI, signer);

            let approveTxn = await wrldContract.approve(AGE_VERIFICATION_CONTRACT_ADDRESS, ethers.utils.parseEther(`${WRISTBAND_WRLD_PRICE}`));

            await approveTxn.wait();
            console.log("Successfully approved NFTWorlds contract to transfer the $WRLD amount set.");

            let updateRD = await wbContract.updateRenewDate(address);

            await updateRD.wait();
            console.log("Successfully updated renew date for Age Verification Wristband");
        } else {
            alert("Man, go and get Metamask!");
        }
    } catch (error) {
        alert("An error has ocurred, refresh the page and try again.");
        console.error(error);
    }
}