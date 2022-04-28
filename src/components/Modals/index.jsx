import "./index.css";

const BaseModal = (props) => {

    const handleHide = (e) => {
        e.preventDefault();
        if (e.target === e.currentTarget && props.canCloseOutside) {
            props.hide();
        }
    }

    return(
        <div className={`modal ${props.visible ? "visible" : ""}`} onClick={handleHide}>
            <div className='modal-content'>
                {props.children}
            </div>
        </div>
    );
}

export default BaseModal;