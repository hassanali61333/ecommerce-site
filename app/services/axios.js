import axios from "axios"


const api= axios.create({
  baseURL: "https://ecommerce-backend-production-348a.up.railway.app/api/users",
  headers  : {"Content-Type" :"application/json"}
})


export default api;