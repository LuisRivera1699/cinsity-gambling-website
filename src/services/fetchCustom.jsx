const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;
    const token = localStorage.getItem("accessToken");

    try {
        if (method === "GET") {
            return fetch(url, {
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    Authorization: `Bearer ${token}`,
                }),
            });
        } else {
            return fetch(url, {
                method,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    Authorization: `Bearer: ${token}`,
                },
                body: JSON.stringify(data),
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const fetchWithoutToken = (endpoint, data, method = "GET") => {
    const url = `${baseUrl}/${endpoint}`;

    try {
        if (method === "GET") {
            return fetch(url, {
                mode: "cors",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                }),
            });
        } else {
            return fetch(url, {
                method,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                },
                body: JSON.stringify(data),
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}