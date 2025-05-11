import axios from "axios";

const api = axios.create({
  baseURL: "https://your-api-base-url.com/api", // Replace with actual base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
