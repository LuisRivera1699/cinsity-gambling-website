import "./index.css";
import arrowDown from "../../../../assets/arrow-down.svg";
import { useState } from "react";

const SettingsItem = (props) => {

    const [isOpened, setIsOpened] = useState(false);

    const switchIsOpened = () => {
        setIsOpened(!isOpened);
    }

    return (
        <div className="item-container">
            <div className="item-title" onClick={switchIsOpened}>
                <h3>Web3 2FA (Two Factor Authentication)</h3>
                <img className={isOpened ? "rotate" : ""} src={arrowDown} alt=""/>
            </div>
            {
                isOpened ?
                <div className="item-content">
                    <p>
                        Web3 2FA is a two factor authentication feature build on Polygon 
                        Blockchain. The password that you will enter/update will be signed 
                        with your wallet and stored in Web32FA Smart Contract. This will be 
                        used as a second step of authentication when you want to withdraw money 
                        from your temporal wallet.
                    </p>
                    <input
                        className="field"
                        name="password"
                        type="password"
                        placeholder="Enter your new password"
                    />
                    <button>
                        <span>SAVE</span>
                    </button>
                </div> :
                null
            }
        </div>
    );
}

export default SettingsItem;