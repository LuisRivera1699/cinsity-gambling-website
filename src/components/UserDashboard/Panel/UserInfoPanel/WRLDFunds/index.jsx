import { useEffect, useRef, useState } from "react";
import { addFunds, getFunds, withdrawFunds } from "../../../../../services/web3/gamepool";
import FirstButton from "../../../../Buttons/FirstButton";
import TextButton from "../../../../Buttons/TextButton";
import InputField from "../../../../InputField";
import "./index.css";

const WRLDFunds = (props) => {

    const [addFundsStatus, setAddFundsStatus] = useState(0);
    const [wrldFunds, setWrldFunds] = useState(0);
    const wrldInput = useRef(null);

    const [withdrawStatus, setWithdrawStatus] = useState(0);
    const withdrawInput = useRef(null);

    useEffect(() => {
        if(props.currentAccount) {
            getFunds(props.currentAccount, setWrldFunds);
        }
    }, [props.currentAccount]);

    const handleAddFunds = async () => {
        if (addFundsStatus === 0) {
            setAddFundsStatus(1);
        } else if (addFundsStatus === 1) {
            let toCharge = parseInt(wrldInput.current.value);
            if (toCharge > 0) {
                await addFunds(toCharge);
                await getFunds(props.currentAccount, setWrldFunds);
                setAddFundsStatus(0);
            }
        }
    }

    const handleWithdraw = async () => {
        if (withdrawStatus === 0) {
            setWithdrawStatus(1);
        } else if (withdrawStatus === 1) {
            let toWithdraw = parseInt(withdrawInput.current.value);
            if (toWithdraw > 0) {
                await withdrawFunds(toWithdraw);
                await getFunds(props.currentAccount, setWrldFunds);
            }
            setWithdrawStatus(0);
        }
    }

    return (
        <div className="wrld-funds-container">
            <h3 className="info-label">CinSity Pool Funds</h3>
            {
                addFundsStatus === 0 ?
                <p className="info-value">{wrldFunds} $WRLD</p> :
                addFundsStatus === 1 ?
                <div className="form">
                    <InputField
                        refHook={wrldInput} 
                        name="wlrdFunds" 
                        type="number" 
                        placeholder="How many WRLD you want to charge?"/> 
                </div>
                :
                null
            }
            <FirstButton
                isAsync={true}
                className="add-funds"
                text="ADD FUNDS"
                method={handleAddFunds}
            />
            {
                withdrawStatus === 1 ?
                <div className="withdraw-form">
                    <InputField
                        refHook={withdrawInput}
                        name="withdraw" 
                        type="number" 
                        placeholder="How many WRLD you want to withdraw?"/> 
                </div> :
                null
            }
            <TextButton
                className="withdraw-button"
                method={handleWithdraw}
                text="Withdraw funds"
            />            
        </div>
    );
}

export default WRLDFunds;