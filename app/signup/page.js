"use client"
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock ,FaNode} from "react-icons/fa";
import {createUser} from "../services/userService.js"
import { useSelector } from "react-redux";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
export default function Signup() {
  const [toggle, setToggle] = useState(false);
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const [Name,setName]=useState("")


const dat=useSelector((state)=> state.products.user)
console.log("mydata",dat)

const handleSignup =  async()=>{
  
  // console.log({ Name, Email, Password }); 
  try{
const response = await createUser({name:Name, email: Email, password: Password})

if(!response){
  toast.error("Invalid email or password")
}
toast.success("Signup successful")
// console.log(response)
  }
  catch (err) {
console.log(err)
  }
}



  return (
    <>
    <Navbar/>
    <section className="py-[50px] flex justify-center items-center bg-gray-100 px-4">
      
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        {/* Heading */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">
            Singup to create account
          </p>
        </div>

           <div className="relative mb-4">
          <FaNode className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            placeholder="Name"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=> setName(e.target.value)}
          />
        </div>


        {/* Email Field */}
        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          
          <input
            type={toggle ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e)=> setPassword(e.target.value)}

          />

          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {toggle ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Signup Button */}
        <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"  onClick={handleSignup}>
          Signup
        </button>

        {/* Bottom Text */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link href="/login" className="text-green-600 font-medium hover:underline">
          Login
          </Link>
        </p>

      </div>
    </section>
    <Footer/>
    </>

  );
}