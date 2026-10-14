"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { createUser } from "../services/userService.js";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";

export default function Signup() {
  const router = useRouter();
  const [toggle, setToggle] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [loading, setLoading] = useState(false);

const handleSignup = async (e) => {
  e.preventDefault();

  if (!Name || !Email || !Password) {
    toast.error("All fields are required");
    return;
  }

  setLoading(true);

  try {
    const response = await createUser({
      name: Name,
      email: Email,
      password: Password,
    });

    // Success (200/201)
    if (response.data.success || response.data.sucess) {
      toast.success("Signup successful! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    }
  } catch (err) {
    // ⚠️ YEH MISSING THA — error yahan aata hai, toast yahan lagao
    const message =
      err.response?.data?.message ||   // "Email already registered"
      err.message ||                    // "Network Error"
      "Something went wrong";

    toast.error(message);
    console.error("Signup error:", err.response?.data);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Navbar />

      <section className="py-[50px] flex justify-center items-center bg-gray-100 px-4 min-h-[80vh]">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold">Create Account</h2>
            <p className="text-gray-500 text-sm">
              Signup to create your account
            </p>
          </div>

          <form onSubmit={handleSignup}>
            {/* Name Field */}
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Full Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Email Field */}
            <div className="relative mb-4">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Password Field */}
            <div className="relative mb-6">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={toggle ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setToggle(!toggle)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-label="Toggle password visibility"
              >
                {toggle ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Signup"}
            </button>
          </form>

          {/* Bottom Text */}
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-green-600 font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}