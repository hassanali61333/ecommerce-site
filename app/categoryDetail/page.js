"use client";

import { useEffect, useState } from "react";
import { getProduct, stockDecrease } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/navbar";
import Link from "next/link";
import { setproductID, setuser,addToCard  } from "../redux/productSlice";
import { useRouter } from "next/navigation";
import { store } from "../redux/store";

export default function Category() {
  const category = useSelector((state) => state.products.category);
  const [products, setProducts] = useState([]);
const router =useRouter()
const dispatch=useDispatch()
  console.log("Redux category:", category);

    const loginUser=useSelector((state)=>state.products.user)
  
  console.log("redx",loginUser)
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const logindata = JSON.parse(data);
      dispatch(setuser(logindata)); 
    }
  }, []);

  useEffect(() => {
    const fetchcollection = async () => {
      const resp = await getProduct();
      const data = resp.data.data;

      console.log("All products:", data);

      // ✅ multiple products ke liye filter use karo
      const filtered = data.filter(
        (item) => item.category === category
      );

      console.log("Filtered:", filtered);

      setProducts(filtered);
    };

    if (category) {
      fetchcollection();
    }
  }, [category]);


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



    dispatch(addToCard(items));   
    const stateCard = store.getState().products.card;
    localStorage.setItem("card", JSON.stringify(stateCard));
};

  return (
    <>
    <Navbar/>
  
    {/* <div className="grid grid-cols-4 gap-5 p-5">
      {products.length > 0 ? (
        products.map((item) => (
          <div key={item._id} className="border p-3 rounded shadow">
            <img
              src={item.image}
              className="h-40 w-full object-cover"
            />
            <h2 className="font-bold">{item.name}</h2>
            <p>Rs: {item.discountedPrice}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div> */}

<div>
  <h1 className=" text-[25px] pl-[70px] font-bold pt-[20px]  "> {category}  Collection</h1>
</div>
    <div className="w-full  grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-6 justify-items-center">

        {products.map((items)=>(

     <div className="w-[240px] group" key={items._id}>
  <div className="relative h-[300px] w-full overflow-hidden rounded-[10px]">
    <img
      src={items.image}
      alt={items.name}
      width={240}
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
        Add to card
      </button>
  
  </div>
</div>
        ))
        }

        </div>
      </>
  );
}