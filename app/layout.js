

import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import  Provider  from "./redux/porvider.js";

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
      <Provider>
        {children}
      </Provider>
      
      </body>
    </html>
  );
}
