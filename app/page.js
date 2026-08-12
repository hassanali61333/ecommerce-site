"use client"
import { getProduct, stockDecrease } from "./services/userService";
import {FaTruck,FaMoneyBillWave,FaHeadphones  } from "react-icons/fa"
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "next/image";
import { addToCard ,setproductID,setuser} from "./redux/productSlice";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import { store } from "./redux/store";
import { useRouter } from "next/navigation";
export default function Home() {

const dispatch=useDispatch()
const [Product,setProduct]=useState([])
const [loading, setLoading] = useState(true);  
const [error, setError] = useState(null);      
  const loginUser=useSelector((state)=>state.products.user)
const router=useRouter()

console.log("redx",loginUser)
useEffect(() => {
  const data = localStorage.getItem("user");
  if (data) {
    const logindata = JSON.parse(data);
    dispatch(setuser(logindata)); 
  }
}, []);


  useEffect(() => {
    const handleProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getProduct();
        setProduct(res.data.data)
      } catch (err) {
        console.log(err);
        setError("Products load nahi ho sakay. Dobara try karein.");
      } finally {
        setLoading(false);
      }
    };

    handleProduct();
  }, []);

  const handleview = (id) => {
    dispatch(setproductID(id));
    localStorage.setItem("productID",JSON.stringify(id))
    router.push("/productdetail");  
  };


const handleClick = async (items) => {
  if (!loginUser) {
    alert("login first");
    return router.push("/login");
  }

    dispatch(addToCard(items));     // THEN CART
    const stateCard = store.getState().products.card;
    localStorage.setItem("card", JSON.stringify(stateCard));
};

  // ✅ Simple skeleton card shown while products are loading
  const ProductSkeleton = () => (
    <div className="w-[240px] animate-pulse">
      <div className="h-[300px] w-full rounded-[10px] bg-gray-200" />
      <div className="space-y-2 bg-white p-4">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-5 w-1/2 rounded bg-gray-200" />
        <div className="h-8 w-full rounded-lg bg-gray-200 mt-2" />
      </div>
    </div>
  );

  return (
    <>
  <Navbar/>
    <div
      className="relative w-[100%] h-[100vh] py-[300px] sm:py-[10px]  bg-cover bg-center "
      style={{
        backgroundImage:
          "linear-gradient(to right, rgb(14,109,49), rgba(0,0,0,0)), url('/images/bgimg.png')",
      }}
    >
    
   <div className="flex flex-col items-start justify-center max-w-[800px] h-full gap-4 px-[40px]  ">
  
  <div className="bg-[rgb(98,150,104)] p-[7px] rounded-[10px]  font-bold">
     <p >
    Buy Sahi Free Delivery Across Pakistan
  </p> 
  </div>
<h1 className="text-white font-semibold leading-tight
               text-[28px] sm:text-[36px] md:text-[48px] lg:text-[60px]">
  Transform Your Home with Quality Essentials
</h1>
  <div className="max-w-[500px]">
    <p className="text-white text-[12px] sm:text-[20px]">
      Discover premium household products at unbeatable prices. 
      From kitchen to bedroom — we've got everything your home needs.
    </p>
  </div>
  <div className="flex gap-2"> 
    <Link href="/product">
    <button className="bg-[rgb(255,136,0)] px-[20px]  hover:bg-[rgb(221,145,58)]  py-[14px] sm:px-[10px] md:px-[40px] sm:py-[10px] md:py-[20px]   rounded-[10px] text-white text-[12px] font-bold cursor-pointer">Shop Now</button>
    </Link>
    <Link href="/collection">
    <button  className="bg-tranparent px-[10px] py-[4px] sm:px-[10px] md:px-[40px] sm:py-[10px] md:py-[20px]    border-1 rounded-[10px] text-white text-[12px] font-bold cursor-pointer">View Collection</button>
    </Link>
  </div>
</div>
    </div>


    <div className="flex items-center justify-center">
      <div className="flex mt-4 px-3 gap-6 lg:gap-[120px]  justify-center  flex-wrap"> 
      <div className="flex justify-center gap-6 items-center">
        <div className=" m-6 p-[2px] sm:p-[10px] rounded-[20px]  text-[rgb(37,110,40)]  bg-[rgb(190,238,186)]">
            <FaTruck  className="text-[35px]"/>
        </div>
<div className="flex flex-col"> 
    <h1 className=" text-[rgb(0,38,255)] sm:text-black sm:font-bold">Free Delivery</h1>
    <p>
All Pakistan</p>
</div>
      </div> 
            <div className="flex  justify-center gap-6 items-center">
        <div className=" m-6 p-[2px] sm:p-[10px] rounded-[20px]  text-[rgb(37,110,40)]  bg-[rgb(190,238,186)]">
            <FaMoneyBillWave  className="text-[35px]"/>
        </div>
<div className="flex flex-col"> 
    <h1 className="text-[rgb(0,38,255)] sm:text-black sm:font-bold">Cash on Delivery</h1>
    <p>
Pay when you receive

</p>
</div>
      </div>


           <div className="flex justify-center gap-6 items-center">
        <div className=" m-6 p-[2px] sm:p-[10px] rounded-[20px]  text-[rgb(37,110,40)]  bg-[rgb(190,238,186)]">
            <FaHeadphones  className="text-[35px] "/>
        </div>
<div className="flex flex-col"> 
    <h1 className="text-[rgb(0,38,255)] sm:text-black sm:font-bold">24/7 Support</h1>
    <p>
We're here to help

</p>
</div>
      </div>
      </div>
    </div> 

<hr className="h-[1px] bg-black"></hr>

 <section className="relative py-[30px] px-[30px]  overflow-hidden ">

    
    {/* =======================================Product============================================ */}

<h1 className="text-[30px] m-6 font-bold">Feature Products</h1>

{/* ✅ Error state */}
{error && !loading && (
  <div className="w-full text-center py-10">
    <p className="text-red-500 font-medium mb-3">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="px-4 py-2 bg-[rgb(255,136,0)] text-white rounded-[10px] font-semibold"
    >
      Reload
    </button>
  </div>
)}

{/* ✅ Loading state — skeleton grid instead of blank screen */}
{loading && (
  <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">
    {Array.from({ length: 8 }).map((_, i) => (
      <ProductSkeleton key={i} />
    ))}
  </div>
)}

{/* ✅ No products found */}
{!loading && !error && Product.length === 0 && (
  <p className="w-full text-center py-10 text-gray-500">No products found.</p>
)}

{/* ✅ Actual products — only rendered once loading is done */}
{!loading && !error && Product.length > 0 && (
  <div className="w-full  grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">

        {Product.map((items)=>(

     <div className="w-[240px] group" key={items._id}>
  <div className="relative h-[300px] w-full overflow-hidden rounded-[10px]">
    <Image
      src={items.image}
      alt={items.name}
      width={280}
      height={100}
      className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
    />
    {/* ✅ Hidden overlay with view link – appears on hover */}
    <div onClick={()=>handleview(items._id)} className="absolute bottom-3  left-[60px] sm:opacity-0 group-hover:opacity-100 bg-[rgb(248,189,63)] rounded-fulltext-black  flex items-center justify-center rounded-[10px]">
      <Link href={`/product/${items._id}`} className=" rounded-[10px] px-4 py-2  text-sm font-semibold hover:bg-[rgb(226,208,148)] ">
        View Details
      </Link>
    </div>
  </div>
  <div className="space-y-2 bg-white p-4">
    <h3 className="text-lg text-gray-800">{items.name}</h3>
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold text-blue-600">Rs. {items.discountedPrice}</span>
      <span className="text-sm text-gray-400 line-through">Rs. {items.discountedPrice}</span>
    </div>
    
      <button className="w-full  bg-[rgb(252,172,0)] py-1 px-1 rounded-lg cursor-pointer hover:bg-[rgb(201,149,39)]" onClick={() => handleClick(items)}>
        Shop Now
      </button>
  
  </div>
</div>
        ))
        }

        </div>
)}


      <div className=" bg-[rgb(10,165,106)] text-black py-[50px] text-center rounded-[20px]">
      
          <h2 className="text-3xl md:text-[30px]  text-white lg:text-[40px] font-bold  mb-4">
            Ready to Start Shopping?
          </h2>
          
          <p className="text-base text-white md:text-lg max-w-3xl mx-auto mb-8">
            Join thousands of happy customers across Pakistan. Cash on Delivery available nationwide!
          </p>
          
          <Link
            href="/product"
            className="md:px-[35px] px-2 py-2 md:py-4 bg-[rgb(255,167,4)]  rounded-[10px] break-all "
            
          >
            Start Shopping  →
           
          </Link>
        </div>
    </section>

 

<Footer/>
    </>
  );
}