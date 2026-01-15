"use client";
import { MoveLeft, X } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";
import Image from "next/image";
import { assets } from "../../../../public/assets";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Spinner from "@/components/UI/Spinner";

function page() {
  const [showAddress, setShowAddress] = useState(false);
  const { cartItems, updateQuantity, setCartItems } = useCart();
  const { isLoading, setIsLoading, user } = useUser();
  const [cartProduct, setCartProduct] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        const ids = Object.keys(cartItems);
        if (!ids.length) {
          setCartProduct([]);
          return;
        }
        setIsLoading(true);
        const data = await Api("get", `/cart/product?ids=${ids?.join(",")}`);
        if (data?.success) {
          setIsLoading(false);
          setCartProduct(data?.products);
        }
      } catch (error) {
        console.log(error?.message);
        setIsLoading(false);
      }
    };

    fetchCartProduct();
  }, [cartItems]);

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const address = await Api("get", "/user/address/get");
      console.log(address);
      if (address?.success) {
        setAddress(address?.address);
        setSelectedAddress(address?.address[0]);
      } else {
        toast.error(address?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  // Final cart
  const finalCart = useMemo(() => {
    return cartProduct
      .map((product) => ({
        ...product,
        quantity: cartItems[product._id] || 0,
        subtotal: product.offerPrice * (cartItems[product._id] || 0),
      }))
      .filter((item) => item.quantity > 0);
  }, [cartProduct, cartItems]);

  // Totals
  const totalPrice = useMemo(() => {
    return finalCart.reduce((sum, item) => sum + item.subtotal, 0);
  }, [finalCart]);

  const tax = +(totalPrice * 0.02).toFixed(2);
  const grandTotal = totalPrice + tax;

  // Place order API
  const PlaceOrder = async () => {
    try {
      if (!selectedAddress)
        return toast.error("Please select your address first");
      if (paymentOption == "COD") {
        setLoading(true);
        const res = await Api("post", "/order/cod", {
          userId: user?._id,
          items: finalCart?.map((item) => ({
            product: item?._id,
            quantity: item?.quantity,
          })),
          address: selectedAddress?._id,
        });
        if (res.success) {
          setLoading(false);
          setCartItems({});
          setCartProduct([]);
          toast.success(res?.message);
          router.push("/my-order");
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      } else {
        // when online payment then call its API
        setLoading(true);
        const res = await Api("post", "/order/stripe", {
          userId: user?._id,
          items: finalCart?.map((item) => ({
            product: item?._id,
            quantity: item?.quantity,
          })),
          address: selectedAddress?._id,
        });
        // console.log("stripe API res--->", res);

        if (res.success) {
          window.location.replace(res?.url);
          setLoading(false);
          setCartItems({});
          setCartProduct([]);
        } else {
          toast.error(res?.message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };


  return finalCart.length > 0 ? (
    <div className="  max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-32 mb-20">
      <div className="flex flex-col md:flex-row ">
        <div className="flex-1 max-w-4xl">
          <h1 className="text-3xl font-medium mb-6 text-gray-700">
            Shopping Cart <span className="text-sm text-primary">3 Items</span>
          </h1>

          <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
            <p className="text-left">Product Details</p>
            <p className="text-center">Subtotal</p>
            <p className="text-center">Action</p>
          </div>

          {finalCart.map((product) => (
            <div
              key={product._id}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-gray-500 pt-3"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.image[0]}
                  className="w-24 h-24 object-cover border rounded"
                />

                <div>
                  <p className="font-semibold">{product.tittle}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <span>Qty:</span>

                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        updateQuantity(product._id, Number(e.target.value))
                      }
                      className="border px-2 py-1 outline-none"
                    >
                      {Array(10)
                        .fill(0)
                        .map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Subtotal */}
              <p className="text-center">
                ${product?.offerPrice * product?.quantity}
              </p>

              <button
                onClick={() =>
                  updateQuantity(product?._id, product?.quantity - 1)
                }
                className="mx-auto bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
          ))}

          <Link href={"/products"}>
            <button className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
              <MoveLeft />
              Continue Shopping
            </button>
          </Link>
        </div>

        <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
          <h2 className="text-xl md:text-xl font-medium text-gray-700">
            Order Summary
          </h2>
          <hr className="border-gray-300 my-5" />

          <div className="mb-6">
            <p className="text-sm font-medium uppercase">Delivery Address</p>
            <div className="relative flex justify-between items-start mt-2">
              {selectedAddress ? (
                <div>
                  <p className="font-medium">
                    {selectedAddress.firstName} {selectedAddress.lastName}
                  </p>
                  <p className="text-gray-600">
                    {selectedAddress.street}, {selectedAddress.city}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">No address found</p>
              )}
              <button
                onClick={() => setShowAddress(!showAddress)}
                className="text-primary hover:underline cursor-pointer"
              >
                Change
              </button>

              {/* Address List */}
              {showAddress && (
                <div className="absolute z-10 mt-14 w-full bg-white border border-gray-300 shadow">
                  {address.length > 0 ? (
                    address.map((item) => (
                      <div
                        key={item._id}
                        onClick={() => {
                          setSelectedAddress(item);
                          setShowAddress(false);
                        }}
                        className={`p-3 text-sm cursor-pointer border-b last:border-b-0
              ${
                selectedAddress?._id === item._id
                  ? "bg-primary/10 border-l-4 border-primary"
                  : "hover:bg-gray-100"
              }
            `}
                      >
                        <p className="font-medium">
                          {item.firstName} {item.lastName}
                        </p>
                        <p className="text-gray-600">
                          {item.street}, {item.city}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="p-3 text-gray-500">No address found</p>
                  )}

                  <Link href="/address">
                    <p className="text-center bg-primary text-white p-2 cursor-pointer">
                      + Add New Address
                    </p>
                  </Link>
                </div>
              )}
            </div>

            <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

            <select
              value={paymentOption}
              onChange={(e) => setPaymentOption(e.target.value)}
              className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
            >
              <option value="COD" className="">
                Cash On Delivery
              </option>
              <option value="Online">Online Payment</option>
            </select>
          </div>

          <hr className="border-gray-300" />

          <div className="text-gray-500 mt-4 space-y-2">
            <p className="flex justify-between">
              <span>Price</span>
              <span>${totalPrice}</span>
            </p>
            <p className="flex justify-between">
              <span>Shipping Fee</span>
              <span className="text-green-600">Free</span>
            </p>
            <p className="flex justify-between">
              <span>Tax (2%)</span>
              <span>${grandTotal}</span>
            </p>
            <p className="flex justify-between text-lg font-medium mt-3">
              <span>Total Amount:</span>
              <span>${grandTotal}</span>
            </p>
          </div>

          <button
            onClick={PlaceOrder}
            disabled={loading}
            className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium transition"
          >
            {loading ? <Spinner /> : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="md:h-screen h-1/2 py-20 sm:py-0 flex justify-center items-center flex-col">
      <p className="text-lg sm:text-xl md:text-3xl text-red-500 font-bold text-center">
        {" "}
        <Image alt="cart" src={assets?.cart} width={300} className="" />
        <span>Your cart is empty !</span>
      </p>
      <Link href={"/products"}>
        <button className="bg-primary px-5 py-2 rounded-md text-white mt-10 cursor-pointer">
          Start Shopping
        </button>
      </Link>
    </div>
  );
}

export default page;
