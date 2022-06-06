import { fetchWithToken } from "../fetchCustom";

const endpoint = "game/baccarat";

export const playBaccarat = async (body) => {
    try {
        const data = await fetchWithToken(endpoint, body, "POST");
        const resp = await data.json();
        return resp;
    } catch (error) {
        console.log(error);
        throw error;
    }
}