import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { withdrawService } from "../../../../../services/web2/temporalWallet";
import { signMessage } from "../../../../../services/web3/signatures";
import { addWrldFunds, getWrldFunds } from "../../../../../services/web3/wrldToken";
import FirstButton from "../../../../Buttons/FirstButton";
import TextButton from "../../../../Buttons/TextButton";
import InputField from "../../../../InputField";
import Web32FAModal from "../../../../Modals/Web32FAModal";
import "./index.css";

const WRLDFunds = (props) => {

    const [addFundsStatus, setAddFundsStatus] = useState(0);
    const [wrldFunds, setWrldFunds] = useState(0);
    const wrldInput = useRef(null);

    const [withdrawStatus, setWithdrawStatus] = useState(0);
    const withdrawInput = useRef(null);
    const cinAddress = localStorage.getItem("cinAddress");

    const [showW32FAModal, setShowW32FAModal] = useState(false);

    useEffect(() => {
        if(cinAddress) {
            toast.promise(
                getWrldFunds(cinAddress, setWrldFunds),
                {
                    pending: false,
                    success: false,
                    error: 'An error has ocurred, check if you are on the correct network.'
                }
            );
        }
    }, [cinAddress, setWrldFunds]);

    const handleAddFunds = async () => {
        if (addFundsStatus === 0) {
            setAddFundsStatus(1);
        } else if (addFundsStatus === 1) {
            let toCharge = parseInt(wrldInput.current.value);
            if (toCharge > 0) {
                await toast.promise(
                    addWrldFunds(toCharge, cinAddress),
                    {
                        pending: false,
                        success: 'Successfully withdrew!',
                        error: {
                            render({data}) {
                                return data.message;
                            }
                        }
                    }
                );
                await getWrldFunds(cinAddress, setWrldFunds);
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
                if (toWithdraw > wrldFunds) {
                    toast.warn('Would exceed $WRLD amount.');
                } else {
                    setShowW32FAModal(true);
                }
            }
        }
    }

    const signAndWithdraw = async (pwd) => {
        await toast.promise(
            async () => {
                const signedPwd = await signMessage(pwd, true);
                const body = {
                    address: props.currentAccount,
                    amount: parseInt(withdrawInput.current.value),
                    sign: signedPwd
                };
                withdrawService(body);
            },
            {
                pending: false,
                success: 'Successfully withdrew!',
                error: {
                    render({data}) {
                        return data.message;
                    }
                }
            }
        );
        await getWrldFunds(cinAddress, setWrldFunds);
        setWithdrawStatus(0);
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
            <Web32FAModal visible={showW32FAModal} canCloseOutside={true} hide={() => {setShowW32FAModal(false)}} method={signAndWithdraw}/>    
        </div>
    );
}

export default WRLDFunds;