import Game from "../../components/Home/Game";
import MainLayout from "../../components/MainLayout";
import arrowDown from "./assets/arrow-down.svg";
import baccarat from "./assets/baccarat.png";
import blackjack from "./assets/blackjack.png";
import craps from "./assets/craps.png";
import poker from "./assets/poker.png";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Home = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 0
        });
    }, []);

    return (
        <MainLayout>
            <div className="banner page-section">
                <div className="banner-content">
                    <h1 className="banner-title">
                        <span>Welcome to </span>
                        <span className="text-blue">CinSity Casino</span>
                        <br/>
                        <span>Amazing </span>
                        <span className="text-pink">Gambling Website</span>
                    </h1>
                    <div className="banner-button-container">
                        <button className="banner-button">
                            <span>START PLAYING</span>
                        </button>
                        <img className="bounce" src={arrowDown} alt="" />
                    </div>
                </div>
            </div>
            <div className="games-section">
                <h2>
                    <span className="text-blue">Meet our </span>
                    <span className="text-pink">gambling games</span>
                </h2>
                <Game
                    link="baccarat"
                    reverse={false}
                    gameImage={baccarat}
                    gameTitle="Baccarat"
                    gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere tincidunt orci, nec iaculis lacus congue sed. Integer euismod mi at efficitur hendrerit. Curabitur semper molestie ligula, ac porttitor erat lobortis vitae."
                />
                <Game
                    link="blackjack"
                    reverse={true}
                    gameImage={blackjack}
                    gameTitle="Blackjack"
                    gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere tincidunt orci, nec iaculis lacus congue sed. Integer euismod mi at efficitur hendrerit. Curabitur semper molestie ligula, ac porttitor erat lobortis vitae."
                />
                <Game
                    link="craps"
                    reverse={false}
                    gameImage={craps}
                    gameTitle="Craps"
                    gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere tincidunt orci, nec iaculis lacus congue sed. Integer euismod mi at efficitur hendrerit. Curabitur semper molestie ligula, ac porttitor erat lobortis vitae."
                />
                <Game
                    link="poker"
                    reverse={true}
                    gameImage={poker}
                    gameTitle="Poker Texas Holdem"
                    gameDescription="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere tincidunt orci, nec iaculis lacus congue sed. Integer euismod mi at efficitur hendrerit. Curabitur semper molestie ligula, ac porttitor erat lobortis vitae."
                />
            </div>
            <div className="page-section slots-banner">
                <h1>
                    <span className="text-blue">Fascinating</span><br/>
                    <span className="text-pink">Slot Games</span><br/>
                    <span>are soon to come</span>
                </h1>
            </div>
        </MainLayout>
    );
}

export default Home;