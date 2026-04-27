import { data } from "autoprefixer";
import api from "./axios";
import { consumeDynamicAccess } from "next/dist/server/app-render/dynamic-rendering";



export const  createUser =(data)=> api.post("/addUser",data)
export const  loginUser =(data)=> api.post("/login",data)
export const  getProduct =()=> api.get("/getProduct")
export const  createOrder = (data)=> api.post("/orders" ,data)
export const   allOrder=()=> api.get("/getAllOrder")
export const   getUser=()=> api.get("/getUser")
export const updateProduct = (id, data) => api.put(`/updateProduct/${id}`, data);
export const deleteProduct =(id)=> api.delete(`/deleteProduct/${id}`)
export const  deleteUser=(id)=> api.delete(`/deleteUser/${id}`)
export const addProduct = (data) => api.post("/createProduct", data, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateOrder = (id, data) => api.put(`/updateOne/${id}`, data);
export const stockIncrease = (id) => api.put(`/stockIncrese/${id}`);
export const stockDecrease=(data)=> api.put("/stockDecrese",data)
export const getCollection =()=> api.get("/getCollection")

export const addCollection =(data)=> api.post("/addCollection/",data, {
  headers : {'Content-Type': 'multipart/form-data'}
})


export const getHistory=(id)=> api.get(`/getSingleOrder/${id}`)
export const trackOrder=(id)=> api.get(`/checkStatus/${id}`)
export const stripePayment=(data)=> api.post("/stripePayment",data)
export const reviews=(data)=> api.post("/review",data)
export const getReview=(id)=> api.get(`/getreview/${id}`)