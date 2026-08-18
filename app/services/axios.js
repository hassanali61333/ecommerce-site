import axios from "axios"


const api= axios.create({
 baseURL: "https://deed-circular-wolf.abasthan.app/api/users",
  headers  : {"Content-Type" :"application/json"}
})


export default api;