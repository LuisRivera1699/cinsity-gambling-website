import logo from "./assets/logo.svg";
import twitter from "./assets/twitter.svg";
import discord from "./assets/discord.svg";
import twitterHovered from "./assets/twitter-hovered.svg";
import discordHovered from "./assets/discord-hovered.svg";

import "./index.css";
import { useState } from "react";

const Footer = () => {

    const [twitterIcon, setTwitterIcon] = useState(twitter);
    const [discordIcon, setDiscordIcon] = useState(discord);

    const handleIconHover = (icon) => {
        if (icon === 'twitter') {
            setTwitterIcon(twitterHovered);
        } else if (icon === 'discord') {
            setDiscordIcon(discordHovered);
        }
    }

    const handleIconUnhover = (icon) => {
        if (icon === 'twitter') {
            setTwitterIcon(twitter);
        } else if (icon === 'discord') {
            setDiscordIcon(discord);
        }
    }

    return(
        <section>
            <footer>
                <div>
                    <img src={logo} alt=""/>
                    <p className="copyright">Copyright © CinCity DAO. An NFTWorlds built for the coolest gamblers and betters.</p>
                </div>
                <div>
                    <h5>CINSITY DAO</h5>
                    <p className="footer-item"><a href="https://cinsity-dao.com" target="_blank" rel="noreferrer">About us</a></p>
                </div>
                <div>
                    <h5>GAME RULES</h5>
                    <p className="footer-item"><a href="/rules/baccarat">Baccarat Rules</a></p>
                    <p className="footer-item"><a href="/rules/blackjack">Blackjack Rules</a></p>
                    <p className="footer-item"><a href="/rules/craps">Craps Rules</a></p>
                    <p className="footer-item"><a href="/rules/poker">Poker Rules</a></p>
                </div>
                <div>
                    <h5>RESOURCES</h5>
                    <p className="footer-item"><a href="/">Gaming Licence</a></p>
                    <p className="footer-item"><a href="/resources/tyc">Terms &amp; Conditions</a></p>
                    <p className="footer-item"><a href="/resources/policies">Privacy Policies</a></p>
                    <p className="footer-item"><a href="/faqs">FAQs</a></p>
                </div>
                <div>
                    <h5>CONTACT</h5>
                    <div className="footer-icon-container">
                        <a href="https://twitter.com/CinSityDAO" target="_blank" rel="noreferrer">
                            <img
                                className="footer-icon"
                                src={twitterIcon} 
                                alt="" 
                                onMouseEnter={() => {handleIconHover('twitter')}} 
                                onMouseLeave={() => {handleIconUnhover('twitter')}} />
                        </a>
                        <a href="https://discord.com/invite/edjf8ms5Wn" target="_blank" rel="noreferrer">
                            <img
                                className="footer-icon discord" 
                                src={discordIcon} 
                                alt="" 
                                onMouseEnter={() => {handleIconHover('discord')}} 
                                onMouseLeave={() => {handleIconUnhover('discord')}} />
                        </a>
                    </div>
                </div>
            </footer>
        </section>
    );
}

export default Footer;