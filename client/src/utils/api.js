import axios from "axios"


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});
const token = JSON.parse(sessionStorage.getItem('token'));

export const apiWithAuth = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }

})

