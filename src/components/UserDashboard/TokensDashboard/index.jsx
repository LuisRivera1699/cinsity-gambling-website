import "./index.css";
import wristbandSource from "./assets/wristband.mp4";
import wave1Source from "./assets/wave1.png";
import wave2Source from "./assets/wave2.mp4";
import TokenCard from "./TokenCard";
import { useEffect, useState } from "react";
import { getTokenBalances } from "../../../services/web2/tokenBalances";

const TokensDashboard = (props) => {
    const [tab, setTab] = useState(0);
    const [hover, setHover] = useState(0);

    const [wristband, setWristband] = useState();
    const [foundersPassList, setFoundersPassList] = useState([]);

    const [wristbandBalance, setWristbandBalance] = useState(false);
    const [foundersPassBalances, setFoundersPassBalances] = useState([0, 0]);
    const [wave1Balance, setWave1Balance] = useState(0);

    useEffect(() => {
        const getMyBalances = async () => {
            const body = {
                address: props.currentAccount,
            }
            const resp = await getTokenBalances(body);
            setWristbandBalance(resp.message.hasWb ? 1 : 0);
            setFoundersPassBalances([resp.message.wave2Balance, resp.message.wave3Balance]);
            setWave1Balance(resp.message.wave1Balance);
        }

        if (props.currentAccount) {
            getMyBalances();
        }
    }, [props.currentAccount, wave1Balance]);

    useEffect(() => {
        setWristband(
            <TokenCard
                isVideo={true}
                source={wristbandSource}
                title="Age Verification Wristband"
                balance={wristbandBalance ? 1 : 0}/>
        );

        setFoundersPassList(
            [
                <TokenCard
                    source={wave1Source}
                    title="Wave 1 Founder’s Pass"
                    balance={wave1Balance}
                />,
                <TokenCard
                    isVideo={true}
                    source={wave2Source}
                    title="Wave 2 Founder’s Pass"
                    balance={foundersPassBalances[0]}
                />,
                <TokenCard
                    isVideo={true}
                    source={wave2Source}
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