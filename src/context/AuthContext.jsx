import { createContext, useContext, useEffect, useState } from "react"
import { checkTokenService, loginService } from "../services/web2/auth";
import { signMessage } from "../services/web3/signatures";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [needWristband, setNeedWristband] = useState(null);

    const checkIfWalletIsConnectedAndLoggedIn = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Man, go and get Metamask!");
            return;
        }

        let lSAccount = localStorage.getItem("account");
        let lSAccessToken = localStorage.getItem("accessToken");

        if (lSAccount === null || lSAccessToken === null) {
            localStorage.removeItem("account");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("cinAddress");
            setIsAuthenticated(false);
            return;
        }

        const resp = await checkTokenService();

        if (resp.success === true) {
            setIsAuthenticated(true);
            setCurrentAccount(lSAccount);
        } else {
            localStorage.removeItem("account");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("cinAddress");
            setIsAuthenticated(false);
        }

    }

    const login = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Man, go and get Metamask!");
            return;
        }

        let accounts = await ethereum.request({method: "eth_accounts"});

        let account;

        if (accounts.length !== 0) {
            account = accounts[0];
        } else {
            try {
                accounts = await ethereum.request({method: "eth_requestAccounts"});
                account = accounts[0];
            } catch (error) {
                console.error(error);
                throw error;
            }
        }

        try {
            let authMessage = process.env.REACT_APP_AUTH_MESSAGE;
            const signedMessage = await signMessage(authMessage, false);
            const body = {
                address: account,
                token: authMessage,
                signature: signedMessage,
            };
            const resp = await loginService(body);
            console.log(resp);
            if (resp.message !== "WB verification failed") {
                setCurrentAccount(account);
                setNeedWristband(false);
                setIsAuthenticated(true);
                localStorage.setItem("accessToken", resp.accessToken);
                localStorage.setItem("account", account);
                localStorage.setItem("cinAddress", resp.cinAddress);
            } else {
                setCurrentAccount(account);
                setIsAuthenticated(false);
                setNeedWristband(true);
            }         
        } catch (error) {
            console.error(error);
            throw error;
        }

    }

    const logout = () => {
        localStorage.removeItem("account");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("cinAddress");
        setCurrentAccount(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on(
                'accountsChanged', () => {
                    if (isAuthenticated) {
                        localStorage.removeItem("account");
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("cinAddress");
                        window.location.reload();
                    }
                }
            );
        }
    });

    useEffect(() => {
        checkIfWalletIsConnectedAndLoggedIn();
    }, [isAuthenticated]);

    const value = {
        currentAccount,
        login,
        logout,
        isAuthenticated,
        needWristband
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth;
}