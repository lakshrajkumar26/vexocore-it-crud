import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"

const baseAPI = axios.create({
    baseURL : baseUrl
})
export default baseAPI;
