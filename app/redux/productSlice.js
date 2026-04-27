"use client";
import { createSlice } from "@reduxjs/toolkit";


const productSlice = createSlice({
  name: "products",
  initialState: {
    card:[],
    user:null,
    productID :null,
    category :null
  },
  reducers: {
setcategory :(state,action) =>{
state.category = action.payload;
},


    addToCard: (state, action) => {
  const exist = state.card.find(item => item._id === action.payload._id);
  if (exist) {
    exist.quantity =   exist.quantity + 1
    

  } else {
    state.card.push({ ...action.payload, quantity: 1 });
  }
},


setAllCard:(state,action)=>{
state.card = action.payload
},
  setporductIncrement :(state,action)=> {

    const porduct=state.card.find((item) => item._id === action.payload)
     if(porduct) {
porduct.quantity = porduct.quantity + 1
porduct.stock = porduct.stock-1

     }  
  },

    setporductDecrement :(state,action)=> {
        const porduct=state.card.find((item) => item._id === action.payload)
     if(porduct && porduct.quantity >1) {
porduct.quantity = porduct.quantity -1
     }  
  },

    

      deleteToCard: (state, action) => {
      state.card= state.card.filter((items)=> items._id !== action.payload )
    },

    setuser :(state,action) =>{
      state.user =action.payload
    },

    setproductID :(state,action) =>{
      state.productID = action.payload
    }
  },
});

export const { addToCard,deleteToCard ,setporductDecrement,setporductIncrement,setAllCard,setuser,setproductID,setcategory} = productSlice.actions;

export default productSlice.reducer;