import Panel from "..";
import "./index.css";

const SettingsPanel = (props) => {
    return(
        <Panel isOption={true}>
            <p className="text-button settings">Settings</p>
        </Panel>
    );
}

export default SettingsPanel;