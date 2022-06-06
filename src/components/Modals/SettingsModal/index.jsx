import BaseModal from "..";
import { signMessage } from "../../../services/web3/signatures";
import { setSignature } from "../../../services/web3/web32fa";
import "./index.css";
import SettingsItem from "./SettingsItem";

const SettingsModal = (props) => {

    const signPwdAndSetWeb32FASignature = async (pwd) => {
        const signedPwd = await signMessage(pwd, true);
        await setSignature(props.hasWeb32FA, signedPwd);
        props.setHasWeb32FA(true);
    }

    return (
        <BaseModal visible={props.visible} canCloseOutside={true} hide={props.hide}>
            <h3 className="modal-title">Settings</h3>
            <SettingsItem
                title="Web3 2FA (Two Factor Authentication)"
                description="Web3 2FA is a two factor authentication feature build on Polygon 
                Blockchain. The password that you will enter/update will be signed 
                with your wallet and stored in Web32FA Smart Contract. This will be 
                used as a second step of authentication when you want to withdraw money 
                from your temporal wallet."
                inputType="password"
                inputPlaceholder="Enter your new password"
                buttonText="SAVE"
                method={signPwdAndSetWeb32FASignature}
            />
        </BaseModal>
    );
}

export default SettingsModal;