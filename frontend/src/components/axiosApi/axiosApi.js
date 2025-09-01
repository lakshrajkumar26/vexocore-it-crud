import axios from "axios";

const baseAPI = axios.create({
    baseURL : "http://localhost:8080"
})
export default baseAPI;
