import MainLayout from "../../components/MainLayout";
import TokensDashboard from "../../components/UserDashboard/TokensDashboard";
import UserInfo from "../../components/UserDashboard/UserInfo";
import { useAuthContext } from "../../context/AuthContext";
import "./index.css";

const UserDashboard = (props) => {

    const { currentAccount } = useAuthContext();

    return (
        <MainLayout>
            <div className="page-section dashboard">
                <UserInfo currentAccount={currentAccount}/>
                <TokensDashboard currentAccount={currentAccount}/>
            </div>
        </MainLayout>
    );
}

export default UserDashboard;