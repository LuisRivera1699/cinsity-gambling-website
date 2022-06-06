import { fetchWithoutToken, fetchWithToken } from "../fetchCustom";

const endpoint_get = "account/getMyNickname";

export const getMyNickname = async (body) => {
    try {
        const data = await fetchWithoutToken(endpoint_get, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

const endpoint_edit = "account/editNickname";

export const editNickname = async (body) => {
    try {
        const data = await fetchWithToken(endpoint_edit, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}