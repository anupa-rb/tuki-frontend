import axios from "axios";

const API_URL = "https://unique-burro-surely.ngrok-free.app/api"; // Your API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper for adding authorization token
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Create a new message
export const createMessage = async (conversationID, description) => {
  return await api.post("/messages", { conversationID, description });
};

// Get messages for a specific conversation
export const getMessages = async (conversationID) => {
  return await api.get(`/messages/${conversationID}`);
};

export default api;
