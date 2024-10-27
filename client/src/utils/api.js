import axios from "axios"


export const api = axios.create({
    baseURL: "https://video-sharing-platformspi2.vercel.app"
});

export const apiWithAuth = axios.create({
    baseURL: "https://video-sharing-platformspi2.vercel.app",
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
    }
    
})

