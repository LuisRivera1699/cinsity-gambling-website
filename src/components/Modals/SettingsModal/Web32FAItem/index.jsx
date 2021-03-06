import "./index.css";
import arrowDown from "../../../../assets/arrow-down.svg";
import { useRef, useState } from "react";
import InputField from "../../../InputField";
import FirstButton from "../../../Buttons/FirstButton";

const Web32FAItem = (props) => {

    const [isOpened, setIsOpened] = useState(false);
    const inputField = useRef(null);
    const lastInputField = useRef(null);

    const switchIsOpened = () => {
        setIsOpened(!isOpened);
    }

    const handleButtonClick = async () => {
        const inputValue = inputField.current.value;
        let lastInputValue = null;
        if (lastInputField.current) {
            lastInputValue = lastInputField.current.value;
        } 

        if (inputValue.length > 0) {
            await props.method(inputValue, lastInputValue);
            inputField.current.value = "";
            lastInputField.current.value = "";
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
                    {
                        props.hasWeb32FA ?
                        <InputField
                            refHook={lastInputField}
                            className="modal-field"
                            name={props.lastInputType}
                            type={props.lastInputType}
                            placeholder={props.lastInputPlaceHolder}
                        /> :
                        null
                    }
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

export default Web32FAItem;