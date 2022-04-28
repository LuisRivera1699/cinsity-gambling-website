import "./index.css";

const Panel = (props) => {
    return (
        <div className={props.isOption ? "panel-option" : "panel-info"} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Panel;