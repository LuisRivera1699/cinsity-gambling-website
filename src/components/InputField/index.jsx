import "./index.css";

const InputField = (props) => {
    return (
        <input
            ref={props.refHook}
            className={`field ${props.className}`} 
            name={props.name} 
            type={props.type} 
            placeholder={props.placeholder}
            onKeyDown={props.onKeyDown}/>
    );
}

export default InputField;