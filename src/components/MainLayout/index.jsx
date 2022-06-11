import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuthContext } from "../../context/AuthContext";
import { checkIfUserHasWristband, mintWristband, updateRenewDate } from "../../services/web3/wristband";
import MintModal from "../Modals/MintModal";
import SuccessfulMintModal from "../Modals/SuccessfulMintModal";
import Footer from "./Footer";
import Header from "./Header";
import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = (props) => {

    const { currentAccount, login, isAuthenticated, needWristband } = useAuthContext();
    const [showSuccessfulMintModal, setShowSuccessfulMintModal] = useState(false);

    const [modalType, setModalType] = useState("mint");

    const mintAgeVerificationWristband = async () => {
        await mintWristband();
        handleLogin();
    }

    const updateAgeVerificationWristbandRenewDate = async () => {
        await updateRenewDate(currentAccount);
        handleLogin();
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

    const handleLogin = async () => {
        await toast.promise(
            login(),
            {
                pending: 'Login in progress...',
                success: 'Successful login!',
                error: {
                    render({data}) {
                        return data.message;
                    }
                }
            }
        );
    }

    return(
        <div>
            <Header currentAccount={currentAccount} connectWallet={handleLogin} isAuthenticated={isAuthenticated}/>
            {props.children}
            <Footer/>
            <MintModal type={modalType} visible={needWristband} mintMethod={mintAgeVerificationWristband} renewMethod={updateAgeVerificationWristbandRenewDate}/>
            <SuccessfulMintModal visible={showSuccessfulMintModal} closeModal={setShowSuccessfulMintModal}/>
            <ToastContainer position="bottom-right"/>
        </div>
    );
}

export default MainLayout;