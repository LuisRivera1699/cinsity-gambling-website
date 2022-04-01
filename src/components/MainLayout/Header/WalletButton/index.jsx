import metamask from "../assets/metamask.svg";
import "./index.css";

const WalletButton = (props) => {

    const formatWallet = () => {
        let first = props.currentAccount.slice(0, 5);
        let last = props.currentAccount.slice(-4);
        return first+"..."+last;
    }

    return (
        <button onClick={props.currentAccount ? () => {} : props.connectWallet} className="wallet-button">
            <span>
                {
                    props.currentAccount ?
                    formatWallet() :
                    "CONNECT WALLET"
                }
            </span>
            {   
                props.currentAccount ?
                null :
                <img src={metamask} alt=""/>
            }
        </button>
    );
}

export default WalletButton;