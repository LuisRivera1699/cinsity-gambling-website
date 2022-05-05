import { useEffect, useRef, useState } from "react";
import "./index.css";
import editIcon from "./assets/edit.png";
import { getUserNickname, setUserNickname } from "../../../../../services/web3/playermanager";
import InputField from "../../../../InputField";

const NicknameField = (props) => {
    const [status, setStatus] = useState(0);
    const nicknameInput = useRef(null);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        if (nickname !== "" && nickname !== null && nickname !== undefined) {
            setStatus(2);
        }
    }, [nickname]);

    useEffect(() => {
        if (props.currentAccount) {
            getUserNickname(props.currentAccount, setNickname);
        }
    }, [props.currentAccount]);

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            let nicknameValue = nicknameInput.current.value;
            let isSet = nickname !== "" && nickname !== null && nickname !== undefined;
            await setUserNickname(nicknameValue, isSet ? true : false, setNickname);
            if (nicknameValue !== "") {
                setNickname(nicknameValue);
            }
        }
    }

    return (
        <div>
            <h3 className="info-label">Nickname</h3>
            {
                status === 0 ?
                <p className="info-value nickname-button" onClick={() => setStatus(1)}>Click to set your nickname</p> :
                status === 1 ?
                <div className="form">
                    <InputField
                        refHook={nicknameInput}
                        name="nickname" 
                        type="text" 
                        placeholder="Enter your nickname"
                        onKeyDown={handleKeyDown} />
                </div> :
                status === 2 ?
                <div className="info-value set-status">
                    <p className="nickname-set-text">{nickname}</p>
                    <img className="edit-icon" src={editIcon} alt="" onClick={() => setStatus(1)}/>
                </div> :
                null
            }
        </div>
    );
}

export default NicknameField;