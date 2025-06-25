import axios from "axios";

export async function refreshToken(){
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/refresh`,{
          withCredentials:true
        })
        return response.data.accessToken
      } catch (error) {
          //redirect to login
          return null
      }
  }