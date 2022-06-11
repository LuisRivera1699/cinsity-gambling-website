import { signMessage } from "../../services/web3/signatures";

export const getAuthMessage = (acc) => {
    let sam = sessionStorage.getItem('authMessage');
    if (sam) {
        return sam;
    } else {
        let ruuid = crypto.randomUUID();
        let am = `Welcome to CinSity!\n\nClick to sign in and accept the CinSity Terms of Service.\n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nThis signature will be in your session storage and will be used as authorization until you close the window.\n\nWallet address:\n${acc}\n\nNonce:\n${ruuid}`;
        sessionStorage.setItem('authMessage', am);
        return am;
    }
}

export const getAuthMessageSignature = async (authMessage, hashIt) => {
    let sams = sessionStorage.getItem('authMessageSignature');
    if (sams) {
        return sams;
    } else {
        let ams = await signMessage(authMessage, hashIt);
        sessionStorage.setItem('authMessageSignature', ams);
        return ams;
    }
}