

import { configureStore } from "@reduxjs/toolkit";
import porductreducer from "./productSlice";

 export const store = configureStore({
reducer:{
  products:porductreducer
}
})
