import { createContext, useContext, useEffect, useState } from "react"
import { checkTokenService, loginService } from "../services/web2/auth";
import { getAuthMessage, getAuthMessageSignature } from "../utils/functions/authMessage";

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [needWristband, setNeedWristband] = useState(null);
    const [chainId, setChanId] = useState("0x13881");

    const checkIfWalletIsConnectedAndLoggedIn = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            alert("Man, go and get Metamask!");
            return;
        }

        let lSAccount = localStorage.getItem("account");
        let lSAccessToken = localStorage.getItem("accessToken");

        if (lSAccount === null || lSAccessToken === null) {
            localStorage.clear();
            sessionStorage.clear();
            setIsAuthenticated(false);
            return;
        }

        const resp = await checkTokenService();

        if (resp.success === true) {
            setIsAuthenticated(true);
            setCurrentAccount(lSAccount);
            let chainId = await ethereum.request({method: 'eth_chainId'});
            setChanId(chainId);
        } else {
            localStorage.clear();
            sessionStorage.clear();
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
            let authMessage = getAuthMessage(account);
            const signedMessage = await getAuthMessageSignature(authMessage, false);
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
        localStorage.clear();
        sessionStorage.clear();
        setCurrentAccount(null);
        setIsAuthenticated(false);
    }

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on(
                'accountsChanged', () => {
                    if (isAuthenticated) {
                        logout();
                        window.location.reload();
                    }
                }
            );
            window.ethereum.on('chainChanged', function(chainId){
                setChanId(chainId);
            });
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
        needWristband,
        chainId
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth;
}