import axios from "axios"


export const api = axios.create({
    baseURL: "https://video-sharing-platformspi2.vercel.app",
    withCredentials: true
});
const token = JSON.parse(sessionStorage.getItem('token'));

export const apiWithAuth = axios.create({
    baseURL: "https://video-sharing-platformspi2.vercel.app",
    headers: {
        Authorization: `Bearer ${token}`,
    }

})

