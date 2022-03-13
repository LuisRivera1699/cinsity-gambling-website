import logo from "./assets/logo.svg";
import WalletButton from "./WalletButton";
import "./index.css";

const Header = () => {
    return(
        <section>
            <header>
                <a href="/"><img src={logo} alt=""/></a>
                <WalletButton/>
            </header>
        </section>
    );
}

export default Header;