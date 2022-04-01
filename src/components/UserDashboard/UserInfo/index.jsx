import NicknameField from "./NicknameField";
import WRLDFunds from "./WRLDFunds";
import "./index.css";

const UserInfo = (props) => {

    const formatWallet = () => {
        if (props.currentAccount) {
            let first = props.currentAccount.slice(0, 15);
            let last = props.currentAccount.slice(-13);
            return first+"..."+last;
        }
    }

    return(
        <div className="info-container">
            <div>
                <h3 className="info-label">Address</h3>
                <p className="info-value">{formatWallet()}</p>
            </div>
            <NicknameField/>
            <WRLDFunds/>
        </div>
    );
}

export default UserInfo;