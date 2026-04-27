// app/success/page.js
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaReceipt, FaHome, FaShoppingBag, FaPrint } from 'react-icons/fa';

export default function Success() {
  const [orderId, setOrderId] = useState(null);
const router=useRouter()
  useEffect(() => {
    // Get order ID from URL params or localStorage (adjust as needed)
    const params = new URLSearchParams(window.location.search);
    const id = params.get('orderId');
    if (id) setOrderId(id);
    else {
      // fallback: get last order from localStorage
      const lastOrder = localStorage.getItem('lastOrderId');
      setOrderId(lastOrder);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header with green gradient */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
              <FaCheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">Order Placed Successfully!</h1>
            <p className="text-green-100 mt-2">Thank you for your purchase</p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Order ID & Info */}
          

            {/* Order Summary (optional – you can fetch actual data) */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <FaReceipt className="text-green-600" /> Order Summary
              </h2>
              <div className="bg-gray-50 rounded-xl p-4 text-gray-600 text-sm space-y-2">
                <p>your order is conformed successfully.</p>
                <p>You can track your order status in the <strong>track order </strong> screen using order id.</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button   onClick={()=> router.push("/historys")}
                href="/my-orders"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition shadow-md hover:shadow-lg"
              >
                <FaShoppingBag /> My Orders
              </button>
              <button
                onClick={()=> router.push("/product")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-green-500 text-gray-700 hover:text-green-600 font-semibold rounded-xl transition"
              >
                <FaHome /> Continue Shopping
              </button>

            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Need help? <Link href="/contact" className="text-green-600 hover:underline">Contact Support</Link></p>
        </div>
      </div>
    </div>
  );
}