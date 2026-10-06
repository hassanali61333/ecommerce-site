

import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import  Provider  from "./redux/porvider.js";
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
      <Provider>
        {children}
       <ToastContainer
            position="bottom-right"
            autoClose={5000}
            closeOnClick
            pauseOnHover
            
          />
      </Provider>
      
      </body>
    </html>
  );
}
