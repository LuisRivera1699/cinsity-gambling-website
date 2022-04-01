import { useRef, useState } from "react";
import "./index.css";

const WRLDFunds = (props) => {
    const [status, setStatus] = useState(0);
    const [wrldFunds, setWrldFunds] = useState(0);
    const wrldInput = useRef(null);

    const handleChangeStatus = () => {
        if (status === 0) {
            setStatus(1);
        } else if (status === 1) {
            let toCharge = parseInt(wrldInput.current.value);
            if (toCharge > 0) {
                // INTEGRATE WITH POOL SMART CONTRACT
                setWrldFunds(wrldFunds + toCharge);
                setStatus(0);
            }
        }
    }

    return (
        <div className="wrld-funds-container">
            <h3 className="info-label">CinSity Pool Funds</h3>
            {
                status === 0 ?
                <p className="info-value">{wrldFunds} $WRLD</p> :
                status === 1 ?
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
            <button className="add-funds" onClick={handleChangeStatus}>
                <span>ADD FUNDS</span>
            </button>
        </div>
    );
}

export default WRLDFunds;