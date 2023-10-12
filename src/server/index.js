import axios from "axios";


export const request = axios.create({
    baseURL: "https://64e84e3b99cf45b15fdf5927.mockapi.io/",
    timeout: 10000,
})