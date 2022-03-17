import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { checkIfUserHasWristband, getWristbandRenewDate, mintWristband, updateRenewDate } from "../../services/web3/wristband";
import { SIX_MONTHS_TIMESTAMP } from "../../utils/constants/time";
import MintModal from "../Modals/MintModal";
import SuccessfulMintModal from "../Modals/SuccessfulMintModal";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";

const MainLayout = (props) => {

    const { currentAccount } = useAuthContext();
    const [hasWristband, setHasWristband] = useState();
    const [mintingSuccessfull, setMintingSuccessfull] = useState();
    const [wristbandRenewDate, setWristbandRenewDate] = useState();
    const [renewSuccessful, setRenewSuccessful] = useState();

    const [showMintModal, setShowMintModal] = useState(false);
    const [showSuccessfulMintModal, setShowSuccessfulMintModal] = useState(false);

    const [modalType, setModalType] = useState("mint");

    useEffect(() => {
        if (currentAccount && !props.noWristbandNeeded) {
            checkIfUserHasWristband(currentAccount, setHasWristband);
        }
    }, [currentAccount, props.noWristbandNeeded]);

    useEffect(() => {
        if (hasWristband === false) {
            setShowMintModal(true);
        } else if (hasWristband === true) {
            setShowMintModal(false);
            console.log("Congrats, you have a wristband.");
            getWristbandRenewDate(currentAccount, setWristbandRenewDate);
        }
    }, [hasWristband, currentAccount]);

    useEffect(() => {
        if (mintingSuccessfull === true) {
            setHasWristband(true);
            setShowSuccessfulMintModal(true);
        }
    }, [mintingSuccessfull]);

    useEffect(() => {
        if (wristbandRenewDate) {
            console.log(Date.now());
            console.log(wristbandRenewDate);
            if(Date.now() > wristbandRenewDate + SIX_MONTHS_TIMESTAMP) {
                setModalType("renew");
                setShowMintModal(true);
            } else {
                console.log("Wristband has not expired yet.");
            }
        }
    }, [wristbandRenewDate]);

    useEffect(() => {
        if (renewSuccessful === true) {
            setShowMintModal(false);
        }
    }, [renewSuccessful]);

    const mintAgeVerificationWristband = async () => {
        await mintWristband(setMintingSuccessfull);
    }

    const updateAgeVerificationWristbandRenewDate = async () => {
        await updateRenewDate(currentAccount, setRenewSuccessful);
    }

    return(
        <div>
            <Header/>
            {props.children}
            <Footer/>
            <MintModal type={modalType} visible={showMintModal} mintMethod={mintAgeVerificationWristband} renewMethod={updateAgeVerificationWristbandRenewDate}/>
            <SuccessfulMintModal visible={showSuccessfulMintModal} closeModal={setShowSuccessfulMintModal}/>
        </div>
    );
}

export default MainLayout;