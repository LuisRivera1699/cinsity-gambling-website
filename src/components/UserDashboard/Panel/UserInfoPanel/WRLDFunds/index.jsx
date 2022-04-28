import { useEffect, useRef, useState } from "react";
import { addFunds, getFunds, withdrawFunds } from "../../../../../services/web3/gamepool";
import "./index.css";

const WRLDFunds = (props) => {

    const [isProcessing, setIsProcessing] = useState(false);

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
        if (!isProcessing) {
            if (addFundsStatus === 0) {
                setAddFundsStatus(1);
            } else if (addFundsStatus === 1) {
                setIsProcessing(true);
                let toCharge = parseInt(wrldInput.current.value);
                if (toCharge > 0) {
                    await addFunds(toCharge);
                    await getFunds(props.currentAccount, setWrldFunds);
                    setAddFundsStatus(0);
                }
                setIsProcessing(false);
            }
        }
    }

    const handleWithdraw = async () => {
        if (!isProcessing) {
            if (withdrawStatus === 0) {
                setWithdrawStatus(1);
            } else if (withdrawStatus === 1) {
                setIsProcessing(true);
                let toWithdraw = parseInt(withdrawInput.current.value);
                if (toWithdraw > 0) {
                    await withdrawFunds(toWithdraw);
                    await getFunds(props.currentAccount, setWrldFunds);
                }
                setWithdrawStatus(0);
                setIsProcessing(false);
            }
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
                    <input
                        ref={wrldInput}
                        className="field" 
                        name="wlrdFunds" 
                        type="number" 
                        placeholder="How many WRLD you want to charge?"/> 
                </div>
                :
                null
            }
            <button className="add-funds" onClick={handleAddFunds}>
                {
                    isProcessing ?
                    <div className="lds-circle"><div></div></div> :
                    <span>ADD FUNDS</span>
                }
            </button>
            {
                withdrawStatus === 1 ?
                <div className="withdraw-form">
                    <input
                        ref={withdrawInput}
                        className="field" 
                        name="withdraw" 
                        type="number" 
                        placeholder="How many WRLD you want to withdraw?"/> 
                </div> :
                null
            }            
            <p className="text-button withdraw-button" onClick={handleWithdraw}>Withdraw funds</p>
        </div>
    );
}

export default WRLDFunds;