import gradientBg from "./assets/gradient-bg.png";
import "./index.css";

const Game = (props) => {
    return(
        <div className={`game-container ${props.reverse ? "row-reverse" : ""}`}>
            <div className="card-container">
                <img data-aos={props.reverse ? "fade-left" : "fade-right"} className="layer-1" src={gradientBg} alt=""/>
                <img data-aos="flip-left" className="layer-2" src={props.gameImage} alt=""/>
            </div>
            <div>
                <h3>{props.gameTitle}</h3>
                <p>{props.gameDescription}</p>
                <div className="game-buttons">
                    <button>
                        <span>COMMING SOON</span>
                    </button>
                    <p className="text-button"><a href={`/rules/${props.link}`}>See our rules</a></p>
                </div>
            </div>
        </div>
    );
}

export default Game;