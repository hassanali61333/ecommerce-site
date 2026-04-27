  "use client"
  import Link from "next/link";
  import { getProduct, stockDecrease } from "../services/userService";
  import Image  from "next/image";
    import {store} from "../redux/store.js"
  import { useState,useEffect } from "react";
  import { FaTruck } from "react-icons/fa";
  import { addToCard } from "../redux/productSlice";
  import { useDispatch,useSelector } from "react-redux";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { setproductID,setuser } from "../redux/productSlice";
import { useRouter } from "next/navigation";





export default function Product() {
const dispatch =useDispatch()
  const [Product,setProduct] =useState([])
  const [Search,setsearach] =useState("")
  const [loading,setloading]=useState(true)

const router = useRouter();
  const loginUser=useSelector((state)=>state.products.user)

console.log("redx",loginUser)
useEffect(() => {
  const data = localStorage.getItem("user");
  if (data) {
    const logindata = JSON.parse(data);
    dispatch(setuser(logindata)); 
  }
}, []);
const no =useSelector((state)=> state.products.card)
console.log("onw data", no)

    useEffect(() => {
      const handleProduct = async () => {
        try {
          const res = await getProduct();
          
          setProduct(res.data.data)
          // console.log(res.data.data)
        } catch (err) {
          console.log(err);
        }
        finally{
          setloading(false)
        }
      };

      handleProduct();
    }, []);

  const filter = Product.filter((items)=>
    items.name.toLowerCase().includes(Search.toLocaleLowerCase())
  )
const handleClick = async (items) => {
  if (!loginUser) {
    alert("login first");
    return router.push("/login");
  }

    dispatch(addToCard(items));
    const stateCard = store.getState().products.card;
    localStorage.setItem("card", JSON.stringify(stateCard));


};

  if(filter.length === 0 ){
    <p> No product found</p>
  }

const handleview = (id) => {
  dispatch(setproductID(id));
  localStorage.setItem("productID",JSON.stringify(id))
  router.push("/productdetail");  
};
    return (
      <>
      <Navbar/>
      <section className="p-6" >
                <h1 className="text-[40px] font-bold mb-4">All Products</h1>
        <div className="flex flex-wrap gap-3  justify-center py-3">
            <input
              className="flex-1  border border-gray-300 py-2 px-3 rounded-md"
              placeholder="Search product"
              onChange={(e)=>setsearach(e.target.value)}
            />
            <div className="bg-black text-white px-4 py-[12px] rounded-[10px] flex items-center gap-2">
              <FaTruck />
              <p className="text-sm">Free Shipping All Over Pakistan</p>
            </div>
          </div>
            {loading ? <p className="text-[24px]">loading product....</p> :

  <div className="w-full  grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 justify-items-center">

        {filter.map((items)=>(

     <div className="w-[240px] group" key={items._id}>
  <div className="relative h-[300px] w-full overflow-hidden rounded-[10px]">
    <Image
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
    <div className="flex gap-1">

         <h3 className="text-lg text-gray-800">{items.name}</h3>
    </div>
 
    <div className="flex items-center gap-3">
      <span className="text-xl font-bold text-blue-600">Rs. {items.discountedPrice}</span>
      <span className="text-sm text-gray-400 line-through">Rs. {items.discountedPrice}</span>
    <p className=" font-bold text-[rgb(236,6,6)]"> stock:{items.stock}</p>

    </div>
    
      <button className="w-full  bg-[rgb(252,172,0)] py-1 px-1 rounded-lg cursor-pointer hover:bg-[rgb(201,149,39)]" onClick={() => handleClick(items)}>
        Shop Now
      </button>
  
  </div>
</div>
        ))
        }

        </div>
  }
      
      </section>
      <Footer/>
      </>
    );
  }