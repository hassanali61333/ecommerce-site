// app/failed/page.js
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaExclamationTriangle, FaRedoAlt, FaShoppingBag, FaHeadset } from 'react-icons/fa';

export default function OrderFailed() {
  const [errorMessage, setErrorMessage] = useState('');

 const router=useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-yellow-600 px-6 py-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
              <FaExclamationTriangle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-white">Order Failed!</h1>
            <p className="text-yellow-100 mt-2">We couldn't complete your order</p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {/* Error Message */}
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-4 mb-6">
              <p className="text-red-700 font-medium">{errorMessage}</p>
              <p className="text-sm text-red-600 mt-1">Please try again</p>
            </div>

            {/* Suggestions */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">Possible reasons:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Payment gateway error or insufficient balance</li>
                <li>Product stock changed while checking out</li>
                <li>Network connection issue</li>
                <li>Technical error on our server</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>router.push("/product")
                 }
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition shadow-md"
              >
                <FaRedoAlt /> Try Again
              </button>
              <button
               onClick={()=> router.push("/card")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-red-500 text-gray-700 hover:text-red-600 rounded-xl transition"
              >
                <FaShoppingBag /> Return to Cart
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}