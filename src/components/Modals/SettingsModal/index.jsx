import BaseModal from "..";
import "./index.css";
import SettingsItem from "./SettingsItem";

const SettingsModal = (props) => {
    return (
        <BaseModal visible={props.visible} canCloseOutside={true} hide={props.hide}>
            <SettingsItem/>
        </BaseModal>
    );
}

export default SettingsModal;