import Panel from "..";
import "./index.css";

const SettingsPanel = (props) => {
    return(
        <Panel isOption={true} onClick={props.onClick}>
            <p className="text-button settings">Settings</p>
        </Panel>
    );
}

export default SettingsPanel;