import { useAuthContext } from "../../../../context/AuthContext";
import metamask from "../assets/metamask.svg";
import "./index.css";

const WalletButton = () => {

    const { currentAccount, connectWallet } = useAuthContext();

    const formatWallet = () => {
        let first = currentAccount.slice(0, 5);
        let last = currentAccount.slice(-4);
        return first+"..."+last;
    }

    return (
        <button onClick={currentAccount ? {} : connectWallet} className="wallet-button">
            <span>
                {
                    currentAccount ?
                    formatWallet() :
                    "CONNECT WALLET"
                }
            </span>
            {   
                currentAccount ?
                null :
                <img src={metamask} alt=""/>
            }
        </button>
    );
}

export default WalletButton;