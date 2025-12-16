import axios from 'axios'
import { create } from 'zustand'


const adminAxios = axios.create({
    baseURL: "https://first-buy.in", // replace with your backend URL
    headers: {
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwcmFuYXZzaGluZGUuYXNAZ21haWwuY29tIiwiYXV0aCI6W3siYXV0aG9yaXR5IjoiUk9MRV9BRE1JTiJ9XSwiZXhwIjoxNzU2NTY2MjAwLCJpYXQiOjE3NTYzODYyMDB9.fB_Rf4E-0oN3wVaWaFAtA6yvNt2CV4O7o_iOIR2KORqAZQ5E1eSLMLkqr_Z4V_BG30a3j3OYc5tuFx3OiVri4A`,
    },
});// 7d // optional varibale

export const adminStore = create((set) => ({
    adminData: null,
    isLoading: false,
    users: null,
    properties: null,
    getUsers: async () => {
        try {
            const response = await adminAxios.get("/api/v1/users/all")
            console.log(response)
            set({users: response.data})
        } catch (error) {
            console.error("Error While Fetching the users", error)
        }
    },

    getAllProperties: async() =>{
        try {
            const response = await adminAxios.get("/api/v1/properties")
            console.log(response)
            set({properties: response.data})
        } catch (error) {
            
        }
    }
}))