import "./index.css";

const TokenCard = (props) => {
    return (
        <div className="token-card">
            <img src={props.image} alt=""/>
            <p>{props.title}</p>
            <p>Balance:   {props.balance}</p>
        </div>
    );
}

export default TokenCard;