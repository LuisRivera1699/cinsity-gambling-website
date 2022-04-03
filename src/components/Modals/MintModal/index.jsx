import { useState } from "react";
import BaseModal from "..";
import wristband from "./assets/wristband.mp4";
import "./index.css";

const MintModal = (props) => {

    const [isProcessing, setIsProcessing] = useState(false);

    const MODAL_SETTINGS = {
        mint: {
            title: "Age Verification Wristband",
            content: "In order to verify your age on our game, you need to mint our ERC-1155 Age Verification Wristband. It costs 2 $WRLD and will expire in 6 months from now. As soon as you mint it, we will be able to validate your ownership of one and you will have complete access to our gambling games.",
            method: props.mintMethod,
            button: "MINT NOW",
            disclaimerVerb: "buying"
        },
        renew: {
            title: "Renew Age Verification Wristband",
            content: "Your minted Age verification wristband has already passed it's 6 months validity. To have access again to our gambling site you must renew it for 2 $WRLD price. Once you have renew it, your wristband recover it's validity for 6 months more.",
            method: props.renewMethod,
            button: "RENEW NOW",
            disclaimerVerb: "renewing"
        }
    }

    const handleClick = async () => {
        setIsProcessing(true);
        await MODAL_SETTINGS[props.type].method()
        setIsProcessing(false);
    }

    return(
        <BaseModal
            visible={props.visible}
        >
            <h3>{MODAL_SETTINGS[props.type].title}</h3>
            <p className="modal-text">{MODAL_SETTINGS[props.type].content}</p>
            <p className="modal-text">By {MODAL_SETTINGS[props.type].disclaimerVerb} this Wristband, you agree to the <a href="/resources/tyc" target="_blank" rel="noreferrer">Terms of Services</a> of CinSity Casino and confirm you are over the age of 18.</p>
            <video className="wristband-modal" autoPlay={true} loop={true} muted={true} playsInline={true}>
                <source src={wristband} type="video/mp4"/>
            </video>
            <button onClick={handleClick}>
                {
                    isProcessing ?
                    <div className="lds-circle"><div></div></div> :
                    <span>{MODAL_SETTINGS[props.type].button}</span>
                }
            </button>
        </BaseModal>
    );
}

export default MintModal;