import logo from "./assets/logo.svg";
import WalletButton from "./WalletButton";
import "./index.css";
import { useAuthContext } from "../../../context/AuthContext";
import ProfileButton from "./ProfileButton";

const Header = () => {

    const { currentAccount, connectWallet } = useAuthContext();

    return(
        <section>
            <header>
                <a href="/"><img src={logo} alt=""/></a>
                <ProfileButton
                    currentAccount={currentAccount}
                />
                <WalletButton
                    currentAccount={currentAccount}
                    connectWallet={connectWallet}
                />
            </header>
        </section>
    );
}

export default Header;