import { signMessage } from "../../services/web3/signatures";

const generateUUID = () => {
    let d = new Date().getTime(), d2 = (performance && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random() * 16;
            if (d > 0) {
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : ((r & 0x7) | 0x8)).toString(16);
        }
    );
};

export const getAuthMessage = (acc) => {
    let sam = sessionStorage.getItem('authMessage');
    if (sam) {
        return sam;
    } else {
        let ruuid = generateUUID();
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