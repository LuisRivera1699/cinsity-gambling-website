import { useState } from "react";
import { useAuthContext } from "../../../../context/AuthContext";
import metamask from "../assets/metamask.svg";
import "./index.css";

const WalletButton = (props) => {

    const [dropLogoutButton, setDropLogoutButton] = useState(false);
    const { logout } = useAuthContext();

    const formatWallet = () => {
        let first = props.currentAccount.slice(0, 8);
        let last = props.currentAccount.slice(-4);
        return first+"..."+last;
    }

    const handleHover = () => {
        if (props.currentAccount) {
            setDropLogoutButton(true);
        }   
    }

    const handleLogout = () => {
        logout();
        setDropLogoutButton(false);
    }

    return (
        <div className="wbutton-container" onMouseEnter={handleHover} onMouseLeave={() => {setDropLogoutButton(false)}}>
            <button onClick={props.currentAccount ? () => {} : props.connectWallet} className={`wallet-button ${dropLogoutButton ? 'drop' : ''}`}>
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
            {
                props.currentAccount ?
                <button className={`logout-button ${dropLogoutButton ? 'visible' : ''}`} onClick={handleLogout}>
                    <span>Logout</span>
                </button> :
                null
            }            
        </div>
    );
}

export default WalletButton;