import { useRef } from "react";
import BaseModal from "..";
import FirstButton from "../../Buttons/FirstButton";
import InputField from "../../InputField";

const Web32FAModal = (props) => {
    const inputPwd = useRef(null);

    const handleButtonClick = () => {
        const pwd = inputPwd.current.value
        if (pwd.length > 0) {
            props.method(pwd);
        }
    }

    return(
        <BaseModal visible={props.visible} canCloseOutside={true} hide={props.hide}>
            <h3 className="modal-title">Web32FA Password</h3>
            <InputField
                refHook={inputPwd}
                className="field modal-field"
                name="password"
                type="password"
                placeholder="Enter your Web32FA Password"
            />
            <FirstButton
                text="VALIDATE"
                method={handleButtonClick}
            />
        </BaseModal>
    );
}

export default Web32FAModal;