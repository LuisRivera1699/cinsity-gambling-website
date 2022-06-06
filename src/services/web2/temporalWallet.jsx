import { fetchWithToken } from "../fetchCustom";

const endpoint_withdraw = "interact/withdraw";

export const withdrawService = async (body) => {
    try {
        const data = await fetchWithToken(endpoint_withdraw, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
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