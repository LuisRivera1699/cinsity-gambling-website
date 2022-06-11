import { fetchWithToken } from "../fetchCustom";

const endpoint_withdraw = "interact/withdraw";

export const withdrawService = async (body) => {
    try {
        const data = await fetchWithToken(endpoint_withdraw, body, "POST");
        if (data.status === 403) {
            throw new Error('Web3 2FA verification failed.');
        }
        const resp = await data.json();
        return resp;
    } catch (error) {
        throw error;
    }
}

const endpoint_balance = "account/getTcwBalance";

export const getTemporalWalletBalance = async (body) => {
    try {
        const data = await fetchWithToken(endpoint_balance, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}