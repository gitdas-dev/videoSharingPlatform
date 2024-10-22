import axios from "axios"


export const api = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
});
const token = JSON.parse(sessionStorage.getItem('token'));

export const apiWithAuth = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    }

})

