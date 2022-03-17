import BaseModal from "..";

const SuccessfulMintModal = (props) => {
    return (
        <BaseModal
            visible={props.visible}
        >
            <h3>Congratulations!</h3>
            <p>Your Age Verification Wristband has successfully been minted. Now you have full gambling access on our website.</p>
            <button onClick={() => props.closeModal(false)}>
                <span>LET'S GO</span>
            </button>
        </BaseModal>
    );
}

export default SuccessfulMintModal;