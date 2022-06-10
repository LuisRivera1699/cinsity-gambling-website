import { useState } from "react";
import "./index.css"

const FirstButton = (props) => {

    const [isProcessing, setIsProcessing] = useState(false);

    const handleClickAsync = async () => {
        setIsProcessing(true);
        await props.method().catch(() => {setIsProcessing(false);});
        setIsProcessing(false);
    }

    const handleClickSync = () => {
        props.method();
    }

    const handleClick = async () => {
        if (!isProcessing) {
            if (props.isAsync) {
                await handleClickAsync();
            } else {
                handleClickSync();
            }
        }
    }

    return(
        <button className={props.className} onClick={handleClick}>
            {
                isProcessing ?
                <div className="lds-circle"><div></div></div> :
                <span>{props.text}</span>
            }
        </button>
    );
}

export default FirstButton;