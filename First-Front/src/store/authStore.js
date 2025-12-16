import { toast } from 'react-toastify';
import {create} from 'zustand'
import api from '../config/AxiosInterceptor';

export const authStore = create((set) =>({
    isLoading: false,
    authData: null,
    login: async(data, navigate) =>{
         try {
            set({isLoading: true})
      const response = await api.post("/api/v1/users/login", data);
    //   console.log(response)
      set({authData: response.data.user})
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      localStorage.setItem("role", response.data.user.role);
      localStorage.setItem("userId", response.data.user.id);
      navigate("/");
      set({isLoading: false})
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.errorMessage || "An error occurred during login"; // error message shows an actual message of error
      set({isLoading: false});
      return { success: false, message: errorMessage };
    }
    },
    isLoggedIn: async() =>{
    try {
        set({isLoading: true})
        const response = await api.get("/api/v1/users/logged-in-user")
        // console.log(response.data)
        set({authData: response.data, isLoading: false})
    } catch (error) {
        set({isLoading: false})
    }
    },
    signup: async(data, navigate)=>{
        try {
            set({isLoading: true})
        const response = await api.post("/api/v1/users/signup", data);
        set({authData: response.data, isLoading: false})
        navigate("/otp-verification", { state: { email: formData.email } });
      } catch (error) {
        console.error("Signup error:", error);
        set({isLoading: false})
      }
    }
    
}))