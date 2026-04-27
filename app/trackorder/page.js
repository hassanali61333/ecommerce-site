'use client';
import { useState } from 'react';
import { FaBox } from "react-icons/fa";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { trackOrder } from "../services/userService";

export default function Trackorder() {
  const [id, setid] = useState("");
  const [data, setdata] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async () => {
    if (!id) {
      setError('Please enter order number or phone number');
      return;
    }

    setLoading(true);
    setError('');
    setdata("");

    try {
      const res = await trackOrder(id);
      console.log("API response:", res.data);

      if (res.data.success) {
        setdata(res.data.status);
      } else {
        setError(res.data.message || 'Order not found');
      }

    } catch (err) {
      console.log("ERROR:", err.response);

      if (err.response) {
        setError(err.response.data.message || err.response.data);
      } else {
        setError("Network error");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="flex flex-col justify-center items-center py-12 px-4">
        <div className="flex flex-col items-center max-w-2xl w-full gap-6">

          {/* Icon */}
          <div className="text-4xl border rounded-full p-4 bg-gray-100">
            <FaBox />
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-3xl font-bold">Track Your Order</h1>
            <p className="text-gray-600 mt-2">
              Enter your order number or phone number to check your order status
            </p>
          </div>

          {/* Input */}
          <div className="w-full">
            <div className="flex gap-3">
              <input
                type="text"
                value={id}
                onChange={(e) => setid(e.target.value)}
                className="flex-1 border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Order number or phone number"
              />

              <button
                onClick={handleTrack}
                disabled={loading}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Wait...' : 'Track'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>

          {/* Help Text */}
          <div className="text-center text-gray-500 text-sm">
            <p>Need help finding your order?</p>
            <p>You can find your order number in the confirmation email we sent you.</p>
          </div>

          {/* Status Box */}
          {data && (
            <div className="w-full bg-white border rounded-xl shadow-md p-6 mt-4 text-center">
              <p className="text-lg font-semibold mb-2">
                Your order status is:
              </p>

              <p className={`px-4 py-2 rounded-full text-white font-semibold inline-block
                ${data === 'pending' ? 'bg-yellow-500' : ''}
                ${data === 'shipped' ? 'bg-blue-500' : ''}
                ${data === 'delivered' ? 'bg-green-500' : ''}
                ${data === 'cancelled' ? 'bg-red-500' : ''}
              `}>
                {data.toUpperCase()}
              </p>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}