import "./index.css";

const Panel = (props) => {
    return (
        <div className={props.isOption ? "panel-option" : "panel-info"}>
            {props.children}
        </div>
    );
}

export default Panel;