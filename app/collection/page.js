"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCollection } from "../services/userService";
import { useDispatch } from "react-redux";
import { setcategory } from "../redux/productSlice";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Collection() {
  const router = useRouter();
  const [collections, setCollections] = useState([]);
const dispatch=useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getCollection();
      
        setCollections(res.data.data);
        
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);


const handlecolleciton = (category) => {
  dispatch(setcategory(category));
  console.log("Clicked:", category);
  router.push("/categoryDetail");
};
  return (
    <>
    <Navbar/>

    <h1 className="text-[30px] ml-[30px] mt-[30px]">All  Collections</h1>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
  {
  
  collections ?
  
  
  collections.map((item) => (
    <div
      key={item._id}
      onClick={() => handlecolleciton(item.name)}
      className="relative group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Image with zoom effect */}
      <div className="overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient overlay + View button */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center gap-2">
        <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300">
          View Collection
        </button>
      </div>

      {/* Title – bottom overlay (always visible) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
        <h2 className="text-white text-lg font-bold text-center drop-shadow-md">
          {item.name}
        </h2>
      </div>
    </div>
  ))
  :  <p className="text-[50px]">No collection available</p>
  }
  
</div>
{
  collections &&
  <Footer/>
  
}
</>

  );
}