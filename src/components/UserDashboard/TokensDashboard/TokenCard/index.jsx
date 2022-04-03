import "./index.css";

const TokenCard = (props) => {
    return (
        <div className="token-card">
            {
                props.isVideo ?
                <video className="video-card" autoPlay={true} loop={true} muted={true} playsInline={true}>
                    <source src={props.source} type="video/mp4"/>
                </video> :
                <img src={props.source} alt=""/>
            }            
            <p>{props.title}</p>
            <p>Balance:   {props.balance}</p>
        </div>
    );
}

export default TokenCard;