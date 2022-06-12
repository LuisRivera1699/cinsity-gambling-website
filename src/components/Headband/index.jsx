import { useAuthContext } from "../../context/AuthContext";
import "./index.css";

const Headband = () => {
    const { chainId } = useAuthContext();
    if (chainId !== "0x13881") {
        return (
            <div className="headband-contianer">
                <p>Your wallet isn't connected to the correct network. Remember that CinSity Casino runs on Mumbai Network.</p>
            </div>
        );
    }
    return null;
}

export default Headband;