"use client"
import Link from "next/link";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { loginUser } from "../services/userService.js";
import { toast } from "react-toastify";
import { setuser } from "../redux/productSlice.js";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import { subscribeToPush } from "../services/userService.js"; // Import the subscribeToPush function

export default function Login() {
  const [toggle, setToggle] = useState(false);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();



const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const subscribeAdminToPush = async (userID) => {
  try {
    console.log("🔔 Starting push setup...");

    if (!("Notification" in window)) {
      console.log("❌ Notification not supported");
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("❌ Service Worker not supported");
      return;
    }

    if (!("PushManager" in window)) {
      console.log("❌ PushManager not supported");
      return;
    }

    console.log("Current permission:", Notification.permission);

    // Permission
    let permission = Notification.permission;

    if (permission === "default") {
      permission = await Notification.requestPermission();
    }

    console.log("Permission result:", permission);

    if (permission !== "granted") {
      console.log("❌ Notification permission denied");
      return;
    }

    // Register Service Worker
    const registration = await navigator.serviceWorker.register("/sw.js");

    console.log("✅ Service Worker registered");

    await navigator.serviceWorker.ready;

    console.log("✅ Service Worker active");

    // VAPID key
    const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

    console.log(
      "VAPID key exists:",
      !!vapidKey
    );

    if (!vapidKey) {
      console.error("❌ VAPID public key missing");
      return;
    }

    const applicationServerKey =
      urlBase64ToUint8Array(vapidKey);

    // Check existing subscription
    let subscription =
      await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription =
        await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        });
    }

    console.log("✅ Push subscription:", subscription);

    // Save MongoDB
    const response = await subscribeToPush(
      userID,
      subscription.toJSON()
    );
    alert("Push subscription saved successfully!");

    console.log(
      "✅ Push subscription saved:",
      response.data
    );

  } catch (error) {
    console.error(
      "❌ Push setup error:",
      error
    );
  }
};
  const handlelogin = async () => {
    console.log("Button clicked");

    try {
      const response = await loginUser({ email, password });
    alert("login sucessfull")
    console.log("token", response.data);
      dispatch(setuser(response.data.data));
      localStorage.setItem("user",JSON.stringify(response.data.data))
      const role = response.data.data.role;
      console.log(role) 


     

    
      if (role === "admin") {
         await subscribeAdminToPush(response.data.data._id);
        router.push("/admin");
      } else {
        router.push("/product");
      }

    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <>
    <Navbar/>
    <section className="py-[50px] flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to access the account</p>
        </div>

        <div className="relative mb-4">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setemail(e.target.value)}
          />
        </div>

        <div className="relative mb-6">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={toggle ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setToggle(!toggle)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {toggle ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
          onClick={handlelogin}
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>
      </div>
    </section>
<Footer/>
    </>
  );
}