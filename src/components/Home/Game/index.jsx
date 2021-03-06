import { useNavigate } from "react-router-dom";
import FirstButton from "../../Buttons/FirstButton";
import TextButton from "../../Buttons/TextButton";
import gradientBg from "./assets/gradient-bg.png";
import "./index.css";

const Game = (props) => {
    const navigate = useNavigate();
    return(
        <div className={`game-container ${props.reverse ? "card-reverse" : ""}`}>
            <div className="card-container">
                <img data-aos={props.reverse ? "fade-left" : "fade-right"} className="layer-1" src={gradientBg} alt=""/>
                <img data-aos="flip-left" className="layer-2" src={props.gameImage} alt=""/>
            </div>
            <div className="game-info">
                <h3>{props.gameTitle}</h3>
                <p>{props.gameDescription}</p>
                <div className="game-buttons">
                    <FirstButton
                        isAsync={false}
                        text={props.isActive ? "PLAY NOW" : "COMMING SOON"}
                        method={props.isActive ? () => {navigate(`games/${props.link}`)} : ()=>{}}
                    />
                    <TextButton link={`rules/${props.link}`} text="See our rules"/>
                </div>
            </div>
        </div>
    );
}

export default Game;