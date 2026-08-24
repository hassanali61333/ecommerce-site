import axios from "axios";

const api = axios.create({
  baseURL: "https://my-backend-production-70cd.up.railway.app/api/users",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;