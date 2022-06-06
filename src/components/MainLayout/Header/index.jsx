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
                    currentAccount={props.isAuthenticated ? props.currentAccount : undefined}
                />
                <WalletButton
                    currentAccount={props.isAuthenticated ? props.currentAccount : undefined}
                    connectWallet={props.connectWallet}
                />
            </header>
        </section>
    );
}

export default Header;