import FirstButton from "../../components/Buttons/FirstButton";
import RCLayout from "../../components/RCLayout";
import "./index.css";

const Rules = () => {
    return (
        <RCLayout>
            <FirstButton
                isAsync={false}
                className="rules-button"
                text="COMMING SOON"
                method={() => {}}
            />
        </RCLayout>
    );
}

export default Rules;