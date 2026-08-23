import axios from "axios"


const api= axios.create({
  baseURL: "my-backend-production-70cd.up.railway.app",
  headers  : {"Content-Type" :"application/json"}
})


export default api;