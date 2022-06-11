import { useEffect, useRef, useState } from "react";
import "./index.css";
import editIcon from "./assets/edit.png";
import InputField from "../../../../InputField";
import { editNickname, getMyNickname } from "../../../../../services/web2/nickname";
import { getAuthMessage, getAuthMessageSignature } from "../../../../../utils/functions/authMessage";

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
        const getNickname = async () => {
            const body = {
                address: props.currentAccount,
            }
            const resp = await getMyNickname(body);
            setNickname(resp.message);
        }
        if (props.currentAccount) {
            getNickname();
        }
    }, [props.currentAccount]);

    const handleKeyDown = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            let nicknameValue = nicknameInput.current.value;
            let authMessage = getAuthMessage(props.currentAccount);
            const signedMessage = await getAuthMessageSignature(authMessage, false);
            const body = {
                address: props.currentAccount,
                token: authMessage,
                signature: signedMessage,
                nickname: nicknameValue
            }
            await editNickname(body);
            setNickname(nicknameValue);
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