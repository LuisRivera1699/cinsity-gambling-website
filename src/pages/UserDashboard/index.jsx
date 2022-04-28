import MainLayout from "../../components/MainLayout";
import TokensDashboard from "../../components/UserDashboard/TokensDashboard";
import UserInfoPanel from "../../components/UserDashboard/Panel/UserInfoPanel";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";
import SettingsPanel from "../../components/UserDashboard/Panel/SettingsPanel";
import SettingsModal from "../../components/Modals/SettingsModal";

const UserDashboard = (props) => {

    const { currentAccount } = useAuthContext();

    return (
        <MainLayout>
            <div className="page-section dashboard">
                <div>
                    <UserInfoPanel currentAccount={currentAccount}/>
                    <SettingsPanel />
                </div>
                <TokensDashboard currentAccount={currentAccount}/>
            </div>
            <SettingsModal visible={true}/>
        </MainLayout>
    );
}

export default UserDashboard;