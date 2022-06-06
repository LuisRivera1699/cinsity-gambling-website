import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { checkIfUserHasWristband, mintWristband, updateRenewDate } from "../../services/web3/wristband";
import MintModal from "../Modals/MintModal";
import SuccessfulMintModal from "../Modals/SuccessfulMintModal";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";

const MainLayout = (props) => {

    const { currentAccount, login, isAuthenticated, needWristband } = useAuthContext();
    const [showSuccessfulMintModal, setShowSuccessfulMintModal] = useState(false);

    const [modalType, setModalType] = useState("mint");

    const mintAgeVerificationWristband = async () => {
        await mintWristband();
        login();
    }

    const updateAgeVerificationWristbandRenewDate = async () => {
        await updateRenewDate(currentAccount);
        login();
    }

    useEffect(() => {
        const mintOrRenew = async () => {
            const hasWb = await checkIfUserHasWristband(currentAccount);
            if (hasWb) {
                setModalType("renew");
            } else {
                setModalType("mint");
            }
        }
        if (needWristband) {
            mintOrRenew();
        }
    }, [needWristband, currentAccount]);

    return(
        <div>
            <Header currentAccount={currentAccount} connectWallet={login} isAuthenticated={isAuthenticated}/>
            {props.children}
            <Footer/>
            <MintModal type={modalType} visible={needWristband} mintMethod={mintAgeVerificationWristband} renewMethod={updateAgeVerificationWristbandRenewDate}/>
            <SuccessfulMintModal visible={showSuccessfulMintModal} closeModal={setShowSuccessfulMintModal}/>
        </div>
    );
}

export default MainLayout;