import BaseModal from "..";
import "./index.css";
import SettingsItem from "./SettingsItem";

const SettingsModal = (props) => {
    return (
        <BaseModal visible={props.visible}>
            <SettingsItem/>
        </BaseModal>
    );
}

export default SettingsModal;