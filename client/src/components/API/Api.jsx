import axios from "axios";
import toast from "react-hot-toast";

const BackendURL = "http://localhost:4000/api";

// Create axios instance
const api = axios.create({
  baseURL: BackendURL,
  withCredentials: true,
});

// Common API call method
export const Api = async (method, url, data = {}, params = {}) => {
  try {
    const response = await api({
      method,
      url,
      data,
      params,
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    toast.error(error?.message);
    throw error;
  }
};
