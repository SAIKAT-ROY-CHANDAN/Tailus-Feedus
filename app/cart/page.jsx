"use client";
import useAuthRedirect from "@/hooks/useRedirect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const Cart = () => {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const isAuthenticated = useAuthRedirect();

  if (!isAuthenticated) {
    toast.error("You need to log in to view your cart", {
      duration: 4000,
      style: { background: "#F87171", color: "white" },
    });
    router.push('/')
    return null;
  }

  console.log(cartItems);
  return (
    <div className="bg-gray-50 min-h-screen flex justify-center w-full">
      <div className="container mx-auto">
        <h1 className="text-2xl mt-20 text-center font-semibold">
          Shopping Cart
        </h1>

        <div className="bg-white max-w-4xl drop-shadow-sm rounded-md mx-auto mt-10">
          {cartItems.length > 0 ? (
            <div className="bg-white max-w-xl p-4 mx-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4"
                >
                  <div class="w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0 bg-gray-100 p-2 rounded-md">
                    <Image
                      src={item.image}
                      width={200}
                      height={200}
                      alt="cart-image"
                    />
                  </div>
                  <h1 key={item.id} className="text-lg font-bold text-gray-800">
                    {item.name}
                  </h1>

                  <div className="flex gap-x-4">
                    <button
                      type="button"
                      class="font-semibold text-red-500 text-xs flex items-center gap-1 shrink-0"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-4 fill-current inline"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                          data-original="#000000"
                        ></path>
                        <path
                          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                      REMOVE
                    </button>

                    <button
                      type="button"
                      class="flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-current"
                        viewBox="0 0 124 124"
                      >
                        <path
                          d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                          data-original="#000000"
                        ></path>
                      </svg>

                      <span class="mx-3 font-bold">2</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-2.5 fill-current"
                        viewBox="0 0 42 42"
                      >
                        <path
                          d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-lg">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
