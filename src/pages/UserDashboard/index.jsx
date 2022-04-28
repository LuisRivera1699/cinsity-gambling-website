import MainLayout from "../../components/MainLayout";
import TokensDashboard from "../../components/UserDashboard/TokensDashboard";
import UserInfoPanel from "../../components/UserDashboard/Panel/UserInfoPanel";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";
import SettingsPanel from "../../components/UserDashboard/Panel/SettingsPanel";
import SettingsModal from "../../components/Modals/SettingsModal";
import { useState } from "react";

const UserDashboard = (props) => {

    const { currentAccount } = useAuthContext();
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    const handleHideSettingsModal = () => {
        setShowSettingsModal(false);
    }

    const handleOpenSettingsModal = () => {
        setShowSettingsModal(true);
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
            <SettingsModal visible={showSettingsModal} hide={handleHideSettingsModal}/>
        </MainLayout>
    );
}

export default UserDashboard;