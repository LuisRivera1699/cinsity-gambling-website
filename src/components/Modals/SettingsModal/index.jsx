import { toast } from "react-toastify";
import BaseModal from "..";
import { signMessage } from "../../../services/web3/signatures";
import { setSignature } from "../../../services/web3/web32fa";
import "./index.css";
import Web32FAItem from "./Web32FAItem";

const SettingsModal = (props) => {

    const signPwdAndSetWeb32FASignature = async (pwd, lpwd) => {
        await toast.promise( 
            async () => {
                const signedPwd = await signMessage(pwd, true);
                let lastSignedPwd = null;
                if (props.hasWeb32FA) {
                    lastSignedPwd = await signMessage(lpwd, true);
                } 
                await setSignature(props.hasWeb32FA, signedPwd, lastSignedPwd);
            },
            {
                pending: 'Web32FA in progress...',
                success: 'Web32FA Password signature successfully created/updated!',
                error: {
                    render({data}) {
                        return data.message;
                    }
                }
            }
        );
        props.setHasWeb32FA(true);
    }

    return (
        <BaseModal visible={props.visible} canCloseOutside={true} hide={props.hide}>
            <h3 className="modal-title">Settings</h3>
            <Web32FAItem
                title="Web3 2FA (Two Factor Authentication)"
                description="Web3 2FA is a two factor authentication feature build on Polygon 
                Blockchain. The password that you will enter/update will be signed 
                with your wallet and stored in Web32FA Smart Contract. This will be 
                used as a second step of authentication when you want to withdraw money 
                from your temporal wallet. We recommend you to write it down in a safe place, 
                if you lose this password, we will not have the ability to recover it, since 
                on the blockchain you are the owner of your data. Make sure to remember this password."
                inputType="password"
                inputPlaceholder="Enter your new password"
                lastInputType="password"
                lastInputPlaceHolder="Enter your current password"
                buttonText="SAVE"
                hasWeb32FA={props.hasWeb32FA}
                method={signPwdAndSetWeb32FASignature}
            />
        </BaseModal>
    );
}

export default SettingsModal;