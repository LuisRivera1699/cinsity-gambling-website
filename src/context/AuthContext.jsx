import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState(null);

    const checkIfWalletIsConnected = async () => {
        const {ethereum} = window;

        if (!ethereum) {
            alert("Man, go and install Metamask!");
            return;
        }

        const accounts = await ethereum.request({method: 'eth_accounts'});

        if (accounts.length !== 0) {
            const account = accounts[0];
            setCurrentAccount(account);
        } 
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Man, go and install Metamask!");
                return;
            }

            const accounts = await ethereum.request({method: "eth_requestAccounts"});

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);
            alert("There has been an error. Refresh the page and try again.");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    });

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on(
                'accountsChanged', () => {
                    window.location.reload();
                }
            );
        }
    });

    const value = {
        connectWallet,
        currentAccount
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth;
}