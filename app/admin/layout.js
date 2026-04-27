import { useSelector } from "react-redux"
import Providers from "../redux/porvider"


export const metadata = {
  tittle: "Buysahi || Admin pannel",
  description: "Manage orders, products, and users",
}




export  default function AdminLayout({children}){
return(

  <Providers>
    {children}
  </Providers>

)
}