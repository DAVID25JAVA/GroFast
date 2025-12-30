import axios from "axios";

const BackendURL = "http://localhost:4000";

// Create axios instance
const api = axios.create({
  baseURL: BackendURL,
  headers: {
    "Content-Type": "application/json",
  },
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
    throw error;
  }
};
