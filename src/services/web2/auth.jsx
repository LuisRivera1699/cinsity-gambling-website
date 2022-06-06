import { fetchWithoutToken, fetchWithToken } from "../fetchCustom"

const endpoint_login = "auth/login";

export const loginService = async (body) => {
    try {
        const data = await fetchWithoutToken(endpoint_login, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const endpoint_check = "auth/checkToken";

export const checkTokenService = async () => {
    try {
        const data = await fetchWithToken(endpoint_check, {}, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}