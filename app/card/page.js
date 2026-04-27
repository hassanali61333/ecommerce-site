 "use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { deleteToCard, setAllCard, setporductIncrement, setporductDecrement ,setuser, addToCard} from "../redux/productSlice";
import { FaTrash } from "react-icons/fa";
import { createOrder,stockIncrease ,stockDecrease, stripePayment} from "../services/userService";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { store } from "../redux/store";
import { useRouter } from "next/navigation";


function Card() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    postalcode: "",
    ordernotes: ""
  });
  const [showCheckout, setShowCheckout] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false); 
const router= useRouter()
  const dispatch = useDispatch();
  const card = useSelector((state) => state.products.card);
console.log("card data", card)


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
    const data = localStorage.getItem("card");
    const newdata = data ? JSON.parse(data) : [];
    dispatch(setAllCard(newdata));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("card", JSON.stringify(card));
  }, [card]);

 const handleSubtraction = async (id) => {

  const cartItem = card.find(item => item._id === id);
  if (!cartItem) return;


  if (cartItem.quantity <= 1) {
    alert("Quantity cannot be less than 1");
    return;
  }
  dispatch(setporductDecrement(id));
  try {
    const resp= await stockIncrease(id);
    console.log("drcrsestock",resp)
  } catch (err) {
    alert("Server error, check console");
    console.log(err.message);

  }
};


  const hanldedel = (id) => {
    dispatch(deleteToCard(id));
    const data = localStorage.getItem("card");
    const newdata = JSON.parse(data);
    const filterdata = newdata.filter((itm) => itm._id !== id);
    localStorage.setItem("card", JSON.stringify(filterdata));
  };

  const calculateTotal = () => {
    return card.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAddition=(product)=>{

if(product.quantity < product.stock){
   dispatch(addToCard(product));
    const stateCard = store.getState().products.card;
    localStorage.setItem("card", JSON.stringify(stateCard));
}
else{
  alert("No more stock are avilabile")
}


  }

  const handlePlaceOrder = async () => {
    
    if (!formData.fullname) {
      alert("Please enter full name");
      return;
    }
    if (!formData.phone) {
      alert("Please enter phone number");
      return;
    }
    if (!formData.city) {
      alert("Please enter city");
      return;
    }
    if (!formData.address) {
      alert("Please enter full address");
      return;
    }
    if (!formData.postalcode) {
      alert("Please enter postal code");
      return;
    }
    if (!loginUser){
      alert("plase login first")
    }

  
    const items = card.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      price: item.discountedPrice,
      total: item.discountedPrice * item.quantity,
      image :item.image,
      
      
    }));

    const totalAmount = calculateTotal();
    const orderPayload = {
      ...formData,
      items,
      totalAmount,
      userID:loginUser._id
    };
    setIsPlacingOrder(true);

    try {
      const response = await createOrder(orderPayload);
      console.log("ordres",response)
      if (response.data.success) {
      
      const stock=  await stockDecrease(items)
   alert("order ppace successfully")
        localStorage.removeItem("card");
        dispatch(setAllCard([]));
        setShowCheckout(false);
        router.push("/success")
      
      } else {
        alert(response.data.message || "Order failed. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };


  const handlestripe= async()=>{


   const items =card.map((item) => ({
  productId: item._id,
  name: item.name,
  price: item.discountedPrice,
  quantity: item.quantity,
  image:item.image
}))

const payload = {
  ...formData,
  items,
  userID:loginUser._id,
  totalAmount:calculateTotal(),
  stripeMethod:'stripe'

}


try{
  const res= await stripePayment(payload)
  console.log(res)
  alert("data send")
await stockDecrease(items)
if(res.data.success){
  const url=res.data.url
       localStorage.removeItem("card");
        dispatch(setAllCard([]));
        setShowCheckout(false);
  router.push(url)
}
}
catch (err) {
  console.log(err.message)
}
  }

  return (

    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-8 px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {card?.map((items) => (
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100" key={items?._id}>
                <div className="flex items-start gap-4">
                  <div className="relative w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                    <Image
                      src={items.image}
                      alt="no image"
                      fill
                      sizes="100vh"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {items.name}
                    </h3>
                    <p className="text-gray-500 text-sm mt-0.5">
                      Rs. {items?.discountedPrice * items.quantity}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => handleSubtraction(items._id)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{items.quantity}</span>
                      <button
                        onClick={() => handleAddition(items)}
                        className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition"
                      >
                        +
                      </button>
                      <button className="ml-auto text-gray-400 hover:text-red-500 transition" onClick={() => hanldedel(items._id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side - Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 sticky top-4">
              <h2 className="font-semibold text-gray-800 mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-800">
                    Rs. {calculateTotal().toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="border-t border-gray-100 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gray-800">
                      Rs. {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Free shipping on all orders</p>
              <button
                onClick={() => setShowCheckout(true)}
                className="w-full mt-4 bg-black hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Popup */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-lg font-semibold text-gray-800">Checkout</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {calculateTotal().toLocaleString()}</p>
            </div>

            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-4">Delivery Details</h3>
              <div className="space-y-3">
                {/* Input fields same as before */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="fullname" value={formData.fullname} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="03XX-XXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email <span className="text-gray-400">(optional)</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="example@email.com" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Full Shipping Address <span className="text-red-500">*</span></label>
                  <textarea name="address" value={formData.address} onChange={handleFormChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="House #, Street, Area" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">City <span className="text-red-500">*</span></label>
                    <input type="text" name="city" value={formData.city} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="Lahore" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Postal Code</label>
                    <input type="text" name="postalcode" value={formData.postalcode} onChange={handleFormChange} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="54000" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Order Notes <span className="text-gray-400">(optional)</span></label>
                  <textarea type="text" value={formData.ordernotes} name="ordernotes" onChange={handleFormChange} rows={2} className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none text-sm" placeholder="Any special instructions..." />
                </div>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <input type="radio" id="cod" name="payment" checked readOnly className="accent-black" />
                    <label htmlFor="cod" className="text-sm font-medium">Cash on Delivery</label>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-5">Pay when you receive your order</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="flex-1 bg-black hover:bg-gray-800 text-white font-medium py-2.5 px-4 rounded-lg transition text-sm disabled:opacity-50"
                  >
                    {isPlacingOrder ? "Placing Order..." : "pay now"}
                  </button>
                  <button onClick={handlestripe}>paynow</button>
                  <button
                    onClick={() => setShowCheckout(false)}  // ✅ fixed: closes popup
                    className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition"
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer/>

    </>
  );
}

export default Card;