"use client";
import Link, { useLinkStatus } from "next/link";
import { useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch, useStore } from "react-redux";   
import { setAllCard,setuser } from "../redux/productSlice";      
import { useRouter } from "next/navigation";


export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();       
        const router=useRouter()         

  const loginUser=useSelector((state)=>state.products.user)

console.log("redx",loginUser)
useEffect(() => {
  const data = localStorage.getItem("user");
  if (data) {
    const logindata = JSON.parse(data);
    dispatch(setuser(logindata)); // Yahan Redux state update hoti hai
  }
}, []);
  

  const card = useSelector((state) => state.products.card);
  const cartCount = card.reduce((total, item) => total + (item.quantity), 0);

  useEffect(() => {
    const data = localStorage.getItem("card");
    const newdata = data ? JSON.parse(data) : [];
    dispatch(setAllCard(newdata));
  }, [dispatch]);

  // Responsive window size handler (same as before)
  useEffect(() => {
    const windowsize = () => {
      if (window.innerWidth < 640) setToggle(false);
      else setToggle(false);
    };
    windowsize();
    window.addEventListener("resize", windowsize);
    return () => window.removeEventListener("resize", windowsize);
  }, []);

const handlelogout = () => {
  localStorage.removeItem("user");
  dispatch(setuser(null)); // 👈 YE LINE ADD KARO
  router.push("/");
};

  return (
    <nav className="w-full bg-white text-black shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex md:flex sm:gap-2 justify-between items-center h-[90px] px-6">
        <div className="flex items-center gap-2">
          <img src="/images/logo.png" className="w-[50px] h-[50px] rounded-[20px]" />
          <h3 className="text-2xl font-bold">Buy Sahi</h3>
        </div>

        <ul className="hidden md:flex gap-2 justify-center items-center md:gap-6 font-medium text-[18px]">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/product">Product</Link></li>
          <li><Link href="/collection">Collection</Link></li>
          <li><Link href="/returnpolicy">Return Policy</Link></li>
          <li><Link href="/trackorder">Track Order</Link></li>
        </ul>

        <div className="flex gap-6 items-center">
          {
            !loginUser ? <Link href='/signup'>
            <FaUser className="text-black border-[1px] rounded-[5px] h-6 w-6 p-[4px] cursor-pointer" />
          </Link> : <p onClick={handlelogout}>logout</p> 
          }


          {
            loginUser &&
         
          <p onClick={()=>router.push("/historys")}>📜</p> 
          }
         

          <div className="relative">
            <Link href="/card">
              <FaShoppingCart className="h-6 w-6 p-[4px] cursor-pointer" />
            </Link>
          
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>

          <button className="md:hidden" onClick={() => setToggle(!toggle)}>
            {toggle ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {toggle && (
        <ul className="md:hidden flex flex-col gap-4 px-6 pb-6 font-medium text-[16px] bg-white">
          <li><Link href="/" onClick={() => setToggle(false)}>Home</Link></li>
          <li><Link href="/product" onClick={() => setToggle(false)}>Product</Link></li>
          <li><Link href="/collection" onClick={() => setToggle(false)}>Collection</Link></li>
          <li><Link href="/returnpolicy" onClick={() => setToggle(false)}>Return Policy</Link></li>
          <li><Link href="/trackorder" onClick={() => setToggle(false)}>Track Order</Link></li>
        </ul>
      )}
    </nav>
  );
}