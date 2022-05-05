import "./index.css";
import arrowDown from "../../../../assets/arrow-down.svg";
import { useRef, useState } from "react";
import InputField from "../../../InputField";
import FirstButton from "../../../Buttons/FirstButton";

const SettingsItem = (props) => {

    const [isOpened, setIsOpened] = useState(false);
    const inputField = useRef(null);

    const switchIsOpened = () => {
        setIsOpened(!isOpened);
    }

    const handleButtonClick = () => {
        const inputValue = inputField.current.value;
        
        if (inputValue.length > 0) {
            props.method(inputValue);
        }

    }

    return (
        <div className="item-container">
            <div className="item-title" onClick={switchIsOpened}>
                <h3>{props.title}</h3>
                <img className={isOpened ? "rotate" : ""} src={arrowDown} alt=""/>
            </div>
            {
                isOpened ?
                <div className="item-content">
                    <p>
                        {props.description}
                    </p>
                    <InputField
                        refHook={inputField}
                        className="modal-field"
                        name={props.inputType}
                        type={props.inputType}
                        placeholder={props.inputPlaceholder}
                    />
                    <FirstButton
                        isAsync={true}
                        method={handleButtonClick}
                        text={props.buttonText}
                    />
                </div> :
                null
            }
        </div>
    );
}

export default SettingsItem;