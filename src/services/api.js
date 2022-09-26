import axios from "axios";

export const host = "http://127.0.0.1:8000/api/v1";

export const call = async (method, path, data) => {
    const response = await axios[method](`${host}/${path}`, data);
    return response.data;
};

export const setAccessToken = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    else {
        delete axios.defaults.headers.common["Authorization"];
    }
};