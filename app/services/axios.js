import axios from "axios"

const api = axios.create({
  baseURL: "https://my-backend-vert-eight.vercel.app/api/users",
  headers: { "Content-Type": "application/json" }
})

export default api;