import "./index.css";
import wristbandImage from "./assets/wristband.png";
import wave1Image from "./assets/wave1.png";
import wave2Image from "./assets/wave2.png";
import TokenCard from "./TokenCard";
import { useEffect, useState } from "react";
import { getTokensBalances } from "../../../services/web3/orchestrator";

const TokensDashboard = (props) => {
    const [tab, setTab] = useState(0);
    const [hover, setHover] = useState(0);

    const [wristband, setWristband] = useState();
    const [foundersPassList, setFoundersPassList] = useState([]);

    const [wristbandBalance, setWristbandBalance] = useState(false);
    const [foundersPassBalances, setFoundersPassBalances] = useState([0, 0]);
    const [wave1Balance, setWave1Balance] = useState(0);

    useEffect(() => {
        if (props.currentAccount) {
            getTokensBalances(props.currentAccount, setWristbandBalance, setFoundersPassBalances, setWave1Balance);
        }
    }, [props.currentAccount]);

    useEffect(() => {
        setWristband(
            <TokenCard
                image={wristbandImage}
                title="Age Verification Wristband"
                balance={wristbandBalance ? 1 : 0}/>
        );

        setFoundersPassList(
            [
                <TokenCard
                    image={wave1Image}
                    title="Wave 1 Founder’s Pass"
                    balance={wave1Balance}
                />,
                <TokenCard
                    image={wave2Image}
                    title="Wave 2 Founder’s Pass"
                    balance={foundersPassBalances[0]}
                />,
                <TokenCard
                    image={wave2Image}
                    title="Wave 3 Founder’s Pass"
                    balance={foundersPassBalances[1]}
                />
            ]
        );
    }, [setWristband, setFoundersPassList, wave1Balance, wristbandBalance, foundersPassBalances]);

    return (
        <div className="tokens-dashboard">
            <div className="tabs-container">
                <div className={`tab${tab === 0 || hover === 0 ? ' selected' : ''}`} 
                    onMouseEnter={() => setHover(0)} 
                    onMouseLeave={() => setHover(null)} 
                    onClick={() => setTab(0)}>
                    <p>Wristband</p>
                </div>
                <div className={`tab${tab === 1 || hover === 1 ? ' selected' : ''}`} 
                    onMouseEnter={() => setHover(1)} 
                    onMouseLeave={() => setHover(null)} 
                    onClick={() => setTab(1)}>
                    <p>Founder's Pass</p>
                </div>
            </div>
            <div className="tokens-container">
                {
                    tab === 0 ?
                    wristband :
                    tab === 1 ?
                    foundersPassList.map((v, i) => {
                        return(
                            foundersPassList[i]
                        );
                    }) :
                    null
                }
            </div>
        </div>
    );
}

export default TokensDashboard;