import "./index.css";

const TextButton = (props) => {
    return(
        props.link ?
        <p className="text-button">
            <a href={props.link}>{props.text}</a>
        </p> :
        <p className={`text-button ${props.className}`} onClick={props.method}>{props.text}</p>
    );
}

export default TextButton;