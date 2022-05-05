import logo from "./assets/logo.svg";
import WalletButton from "./WalletButton";
import "./index.css";
import ProfileButton from "./ProfileButton";

const Header = (props) => {
    return(
        <section>
            <header>
                <a href="/"><img src={logo} alt=""/></a>
                <ProfileButton
                    currentAccount={props.currentAccount}
                />
                <WalletButton
                    currentAccount={props.currentAccount}
                    connectWallet={props.connectWallet}
                />
            </header>
        </section>
    );
}

export default Header;