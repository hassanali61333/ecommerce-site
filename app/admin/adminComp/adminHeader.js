"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setuser } from "@/app/redux/productSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function AdminHeader() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handlelogout = () => {
    localStorage.removeItem("user");
    dispatch(setuser(null));
    router.push("/");
  };

  const menu = [
    { name: "Dashboard", icon: "📊", path: "/admin" },
    { name: "Orders", icon: "📦", path: "/admin/adminOrder" },
    { name: "Products", icon: "🛍️", path: "/admin/adminProduct" },
    { name: "Customers", icon: "👥", path: "/admin/adminCustomer" },
    { name: "Add product", icon: "➕", path: "/admin/addProduct" },
    { name: "Add collection", icon: "📁", path: "/admin/addcollection" },
  ];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between bg-green-600 text-white p-4 fixed top-0 left-0 w-full z-50">
        <h1 className="font-bold">Admin Panel</h1>
        <button onClick={() => setOpen(true)}>
          <FaBars size={22} />
        </button>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <section
        className={`
        bg-[rgb(0,156,83)] text-white
        fixed top-0 left-0 h-full w-[240px]
        flex flex-col justify-between
        z-50 transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        {/* CLOSE BUTTON (mobile only) */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex flex-col items-center pt-4">
          <div className="w-20 h-20 mb-6 bg-white/10 flex items-center justify-center rounded-2xl overflow-hidden">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </div>

          {/* MENU */}
          <ul className="w-full space-y-2 px-4">
            {menu.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  onClick={() => setOpen(false)} // close on mobile click
                  className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/20 transition"
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* LOGOUT */}
          <button
            onClick={handlelogout}
            className="mt-6 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* USER */}
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
              H
            </div>
            <div>
              <p className="text-sm font-semibold">Hassan Ali</p>
              <p className="text-xs text-white/70">Admin</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}