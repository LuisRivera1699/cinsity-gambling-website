import Game from "../../components/Home/Game";
import MainLayout from "../../components/MainLayout";
import arrowDown from "../../assets/arrow-down.svg";
import baccarat from "./assets/baccarat.png";
import blackjack from "./assets/blackjack.png";
import craps from "./assets/craps.png";
import poker from "./assets/poker.png";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import FirstButton from "../../components/Buttons/FirstButton";

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
                        <FirstButton
                            isAsync={false}
                            className="banner-button"
                            text="START PLAYING"
                            method={() => {}}
                        />
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
                    gameDescription="Originated from Italy in 1400, in this simple game of guessing, there are 2 options. Banker's hand, and Player's hand. The hand that has the highest points out of a possible 9 points will be victorious. Will you win with the House or bet against it?"
                />
                <Game
                    link="blackjack"
                    reverse={true}
                    gameImage={blackjack}
                    gameTitle="Blackjack"
                    gameDescription="The stable game in French casinos around 1700 is one of the most popular and liked poker games today. With the goal of getting a higher score than the dealer, each player is dealt 2 cards. You have the option to hit more cards or stay. Who will reach 21 first? You and your friends or the House?"
                />
                <Game
                    link="craps"
                    reverse={false}
                    gameImage={craps}
                    gameTitle="Craps"
                    gameDescription="Often overwhelming to new players with sheer amount of numbers on the table, it is believed that Roman soldiers invented the game of craps using knuckle-bones of a pig as dice and their armor shields as a table. Others believe craps originated from an Arabic dice game called Al Dar and that merchants brought the game over to Europe. With an even money bet, 2 dice are rolled. If you hit a 7 or 11, you win. If you hit 2, 3 or 12 you lose. With 0 strategy and skill, where will your luck take you?"
                />
                <Game
                    link="poker"
                    reverse={true}
                    gameImage={poker}
                    gameTitle="Poker Texas Holdem"
                    gameDescription="With 100 Million people playing poker online, Texas hold 'em is now one of the most popular forms of poker. With fierce tournaments, players and mind games, Texas hold'em is the combination of luck and skill. Each player gets dealt 2 cards and the dealer Flops 3 card, then a Turn card and a River card. The player with the best hand at the end wins. Will you have the upper hand against the players?"
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