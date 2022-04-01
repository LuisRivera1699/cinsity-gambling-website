import { useEffect, useState } from "react";
import "./index.css";
import editIcon from "./assets/edit.png";

const NicknameField = (props) => {
    const [status, setStatus] = useState(0);
    const [nickname, setNickname] = useState(null);

    useEffect(() => {
        if (nickname) {
            setStatus(2);
        }
    }, [nickname]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            // INTEGRATE WITH NICKNAME SMART CONTRACT
            if (e.target.value !== "") {
                setNickname(e.target.value);
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