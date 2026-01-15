import axios from "axios";


// const BackendURL = "http://localhost:4000/api";
const BackendURL = "https://gro-fast-greencart.vercel.app";

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
    console.log("API Error:", error.response?.data || error.message);
    // toast.error(error?.message);
    throw error;
  }
};
