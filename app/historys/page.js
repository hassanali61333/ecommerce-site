// app/history/page.js
'use client';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import { setuser } from '../redux/productSlice';
import { getHistory } from '../services/userService';
import Navbar from '../components/navbar';

export default function History() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.products.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [myid,setmyid]=useState("")

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const logindata = JSON.parse(data);
      dispatch(setuser(logindata));
    }
  }, [dispatch]);

  useEffect(() => {
    if (loginUser?._id) {
      const fetchOrders = async () => {
        try {
          const res = await getHistory(loginUser._id);
          if (res.data.success) {
            setOrders(res.data.data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [loginUser]);

  const   handlecopy= async(id)=>{

    const res= await navigator.clipboard.writeText(id)
    setmyid(id)
    alert("text copied")
    console.log("myid",myid)
    setTimeout(() => {
      setmyid("")
      console.log("maljfasj")
      
    }, 2000);

  }

  if (loading) return <div className="p-6 text-center">Loading orders...</div>;
  if (!loginUser) return <div className="p-6 text-center">Please login to see your orders</div>;

  return (
    <>
    <Navbar/>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">📦 My Order History</h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            >
              {/* Order Header */}
              <div className="bg-gradient-to-r from-indigo-50 to-white px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-2">
                <div>
                  <p className="text-xs text-gray-500">Order ID</p>
                  <div className='flex gap-2'>
                  <p className="font-mono text-sm font-semibold text-gray-700">#{order._id}</p>
                <button
  onClick={() => handlecopy(order._id)}
  className="bg-gray-800 text-white hover:bg-gray-500 text-gray-700 px-3 py-1 rounded-md text-sm transition duration-200 ease-in-out flex items-center gap-1"
>
  📋 Copy
</button>

                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Placed on</p>
                  <p className="text-sm font-medium text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString('en-PK', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Total Amount</p>
                  <p className="text-lg font-bold text-green-600">Rs. {order.totalAmount.toLocaleString()}</p>
                </div>
              
              </div>

              {/* Items Grid */}
              <div className="p-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Items</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex gap-3 items-center bg-gray-50 p-3 rounded-xl hover:bg-gray-100 transition">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item?.image }
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => e.target.src = '/placeholder-product.png'}
                        />
                      </div>
                      {/* Product Details */}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 line-clamp-1">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-green-600">Rs. {item.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* View Details Link */}
               
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
}