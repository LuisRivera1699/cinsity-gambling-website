import "./index.css";

const BaseModal = (props) => {
    return(
        <div className={`modal ${props.visible ? "visible" : ""}`}>
            <div className='modal-content'>
                {props.children}
            </div>
        </div>
    );
}

export default BaseModal;