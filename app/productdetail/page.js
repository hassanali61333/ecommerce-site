"use client";
import { useEffect, useState } from "react";
import { getProduct, stockDecrease } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { reviews,getReview } from "../services/userService";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { setproductID,addToCard, setuser } from "../redux/productSlice";
import { store } from "../redux/store";
import { PiOrangeDuotone } from "react-icons/pi";
import { FaStar } from 'react-icons/fa';
export default function ProductDetail() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState([]);


  const [error, setError] = useState(null);
    const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const dispatch=useDispatch()
  
  const loginUser=useSelector((state)=>state.products.user)

console.log("redx",loginUser)
useEffect(() => {
  const data = localStorage.getItem("user");
  if (data) {
    const logindata = JSON.parse(data);
    dispatch(setuser(logindata)); 
  }
}, []);


  const productID = useSelector((state) => state.products.productID);
useEffect(()=>{
const id= localStorage.getItem("productID")
const nowid=JSON.parse(id)
dispatch(setproductID(nowid))
},[])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProduct();
        setAllProducts(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);





  // Find the specific product
  const product = allProducts.find((item) => item._id === productID);
console.log("dpksjfs",product)

console.log(product)
const handleClick = async (items) => {
  if (!loginUser) {
    alert("login first");
    return router.push("/login");
  }

    dispatch(addToCard(items));     
    const stateCard = store.getState().products.card;
    localStorage.setItem("card", JSON.stringify(stateCard));


};

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please select a rating');
      return;
    }
    
   
const data ={
  userID : loginUser._id,
  productID : productID,
  rating:rating,
  review:comment
 
}

    try{

      const response= await reviews(data)
      console.log("review",response)
        if(response.data.success){
alert(response.data.message)
setComment('')
setRating(0)
        }
      
    }
    catch (err) {
      alert("Error check console")
      console.log(err.message)
    }



  };
const myreviw = async () => {
  if (!loginUser) 
  alert("login fisrt");
  const id = loginUser._id;
  try {
    const response = await getReview(id);
    console.log("all review", response.data.data);
    setdata(response.data.data)
  } catch (err) {
    console.error("Error fetching reviews:", err);
  }
};
const filter=data.filter((its)=> its.productID === productID)
console.log(filter)
useEffect(() => {
  myreviw();
}, [loginUser]); // ✅ Always 1 dependency – correct

console.log("statedata",data)

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center text-red-500">{error}</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
            <Link href="/product" className="text-green-600 underline mt-2 block">
              Back to Products
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Product is found – display details
  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-2xl font-bold text-green-600">
                Rs. {product.discountedPrice}
              </span>
              <span className="text-lg text-gray-400 line-through">
                Rs. {product.originalPrice}
              </span>
              <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded-full">
                Save Rs. {product.originalPrice - product.discountedPrice}
              </span>
            </div>

            <p className="mt-4 text-gray-600">{product.shortDescription}</p>

            {product.description && product.description.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Description</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  {product.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {product.feature && product.feature.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Features</h3>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                  {product.feature.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
               
              </div>
             
            )}

            {
               <p className="text-black font-bold"> stock :{product.stock}</p>
            }

            <div className="mt-6">
             
            <button className="w-full  bg-[rgb(252,172,0)] py-1 px-1 rounded-lg cursor-pointer hover:bg-[rgb(201,149,39)]" onClick={() => handleClick(product)}>
        Shop Now
      </button>
             
            </div>
          </div>
        </div>
      </div>
<div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center">
  <div className="w-full  flex  flex-col  flex-start bg-white rounded-xl shadow-md p-6">
    <h3 className="text-xl font-semibold mb-4 text-center">Rate this product</h3>
    
    {/* Stars */}
    <div className="flex justify-center gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-3xl focus:outline-none transition-transform hover:scale-110"
        >
          <FaStar
            className={`${
              (hover || rating) >= star ? 'text-yellow-500' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
    
    <p className="text-sm text-gray-600 text-center mb-4">
      {rating > 0 ? `You selected ${rating} star${rating > 1 ? 's' : ''}` : 'Tap a star to rate'}
    </p>

    {/* Comment input */}
    <textarea
      rows={3}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-blue-500"
      placeholder="Write your review (optional)"
    />

    {/* Submit button */}
    <button
      onClick={handleSubmit}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Submit Rating
    </button>
  </div>
</div>
 
 {/* // Customer reviews */}

<div className="max-w-6xl mx-auto px-4 flex flex-col justify-center items-center">
  <div className="w-full  bg-white rounded-xl shadow-md p-6">
  <h3 className="text-xl font-semibold mb-4 text-gray-800">Customer Reviews</h3>

  {filter.length === 0 ? (
    <p className="text-gray-500 text-center py-6">No reviews yet. Be the first to review!</p>
  ) : (
    <div className="space-y-5">
      {filter.map((review) => (
        <div
          key={review._id}
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition"
        >
          {/* Rating Stars (yellow) */}
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star}>
                {star <= review.rating ? (
                  <svg
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-300 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                )}
              </span>
            ))}
          </div>

          {/* Review Text */}
          <p className="text-gray-700 leading-relaxed mb-2">{review.review}</p>

          {/* Date and optional user hint */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>
              {new Date(review.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
            <span>⭐ Verified</span>
          </div>
        </div>
      ))}
    </div>
  )}
  </div>
</div>


      <Footer />
    </>
  );
}