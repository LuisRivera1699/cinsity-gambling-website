import { useEffect, useState } from "react";
import "./index.css";
import editIcon from "./assets/edit.png";
import { getUserNickname, setUserNickname } from "../../../../services/web3/playermanager";

const NicknameField = (props) => {
    const [status, setStatus] = useState(0);
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        console.log(nickname === "");
        if (nickname !== "" && nickname !== null && nickname !== undefined) {
            console.log("x");
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
            let nicknameValue = e.target.value;
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
                <form className="form">
                    <input 
                        className="field" 
                        name="nickname" 
                        type="text" 
                        placeholder="Enter your nickname"
                        onKeyDown={handleKeyDown} />
                </form> :
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