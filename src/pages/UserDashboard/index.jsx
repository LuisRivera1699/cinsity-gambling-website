import MainLayout from "../../components/MainLayout";
import TokensDashboard from "../../components/UserDashboard/TokensDashboard";
import UserInfoPanel from "../../components/UserDashboard/Panel/UserInfoPanel";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";
import SettingsPanel from "../../components/UserDashboard/Panel/SettingsPanel";
import SettingsModal from "../../components/Modals/SettingsModal";
import { useEffect, useState } from "react";
import { checkIfHasSignature, validateSignature } from "../../services/web3/web32fa";
import Web32FAModal from "../../components/Modals/Web32FAModal";
import { signMessage } from "../../services/web3/signatures";
import { toast } from "react-toastify";

const UserDashboard = (props) => {

    const { currentAccount } = useAuthContext();
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [hasWeb32FA, setHasWeb32FA] = useState(false);

    const handleHideSettingsModal = () => {
        setShowSettingsModal(false);
    }

    const handleOpenSettingsModal = () => {
        setShowSettingsModal(true);
    }

    useEffect(() => {
        if (currentAccount) {
            toast.promise(
                checkIfHasSignature(setHasWeb32FA),
                {
                    pending: false,
                    success: false,
                    error: 'An error has ocurred, check if you are on the correct network.'
                }
            );
        }
    }, [currentAccount]);

    const signPwdAndValidateWeb32FASignature = async (pwd) => {
        const signedPwd = await signMessage(pwd, true);
        await validateSignature(currentAccount, signedPwd);
    }

    return (
        <MainLayout>
            <div className="page-section dashboard">
                <div>
                    <UserInfoPanel currentAccount={currentAccount}/>
                    <SettingsPanel onClick={handleOpenSettingsModal} />
                </div>
                <TokensDashboard currentAccount={currentAccount}/>
            </div>
            <SettingsModal visible={showSettingsModal} 
                hide={handleHideSettingsModal} 
                currentAccount={currentAccount} 
                hasWeb32FA={hasWeb32FA} 
                setHasWeb32FA={setHasWeb32FA}/>
            <Web32FAModal visible={false}
                currentAccount={currentAccount}
                method={signPwdAndValidateWeb32FASignature}
            />
        </MainLayout>
    );
}

export default UserDashboard;