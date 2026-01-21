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
import Loader from "@/components/UI/Loader";

function page() {
  const [showAddress, setShowAddress] = useState(false);
  const { cartItems, updateQuantity, setCartItems } = useCart();
  const { isLoading, setIsLoading, user } = useUser();
  const [cartProduct, setCartProduct] = useState([]);
  const [address, setAddress] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Changed to true initially

  useEffect(() => {
    fetchAddress();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // FIXED: Added cartItems as dependency and added loading check
  useEffect(() => {
    const fetchCartProduct = async () => {
      try {
        const ids = Object.keys(cartItems);

        // If no cart items, clear products
        if (!ids.length) {
          setCartProduct([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const data = await Api("get", `/cart/product?ids=${ids?.join(",")}`);

        if (data?.success) {
          setCartProduct(data?.products);
        } else {
          setCartProduct([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error?.message);
        setCartProduct([]);
        setIsLoading(false);
      }
    };

    // Only fetch if cartItems is defined (context is loaded)
    if (cartItems !== undefined && cartItems !== null) {
      fetchCartProduct();
    }
  }, [cartItems]); // Added cartItems as dependency

  const fetchAddress = async () => {
    try {
      setIsLoading(true);
      const address = await Api("get", "/user/address/get");

      if (address?.success) {
        setAddress(address?.address);
        setSelectedAddress(address?.address[0]);
      } else {
        toast.error(address?.message);
      }
      setIsLoading(false);
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
        setLoading(true);
        const res = await Api("post", "/order/stripe", {
          userId: user?._id,
          items: finalCart?.map((item) => ({
            product: item?._id,
            quantity: item?.quantity,
          })),
          address: selectedAddress?._id,
        });

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

  // Show loader only initially, not when isLoading changes
  if (loading) return <Loader />;

 
  

  return finalCart.length > 0 ? (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24">

    <div className="grid lg:grid-cols-3 gap-5 p-5 ">
      <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Shopping Cart</h2>
          <p className="text-gray-500">{finalCart.length} Items</p>
        </div>
        <div className="hidden lg:grid grid-cols-12 gap-4 mt-5 font-semibold border-b pb-2">
          <p className="col-span-6">Product Details</p>
          <p className="col-span-3">Quantity</p>
          <p className="col-span-2">Subtotal</p>
          <p className="col-span-1">Action</p>
        </div>
        <div className="mt-5 space-y-4">
          {finalCart.map((product) => (
            <div
              key={product._id}
              className="grid lg:grid-cols-12 gap-4 border-b pb-4 last:border-b-0"
            >
              <div className="lg:col-span-6 flex gap-3">
                <Image
                  src={product?.image[0]}
                  alt={product?.tittle}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-semibold text-lg">{product.tittle}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-primary font-semibold mt-1">
                    ${product.offerPrice}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-3 flex items-center">
                <div>
                  <p className="lg:hidden font-semibold mb-1">Qty:</p>
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
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="lg:col-span-2 flex items-center">
                <div>
                  <p className="lg:hidden font-semibold mb-1">Subtotal:</p>
                  <p className="font-semibold text-lg">
                    ${product?.offerPrice * product?.quantity}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-1 flex items-center">
                <X
                  onClick={() =>
                    updateQuantity(product?._id, product?.quantity - 1)
                  }
                  className="mx-auto bg-red-500 text-white cursor-pointer rounded-full w-6 h-6 flex items-center justify-center"
                />
              </div>
            </div>
          ))}
        </div>
        <Link
          href={"/"}
          className="flex items-center gap-2 text-primary hover:underline mt-5"
        >
          <MoveLeft /> Continue Shopping
        </Link>
      </div>
      <div className="bg-white shadow-md rounded-lg p-5 h-fit">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Delivery Address</h3>
          {selectedAddress ? (
            <div className="bg-gray-50 p-3 rounded-md text-sm">
              <p className="font-semibold">
                {selectedAddress.firstName} {selectedAddress.lastName}
              </p>
              <p className="text-gray-600">
                {selectedAddress.street}, {selectedAddress.city}
              </p>
            </div>
          ) : (
            <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-500">
              No address found
            </div>
          )}
          <p
            onClick={() => setShowAddress(!showAddress)}
            className="text-primary hover:underline cursor-pointer mt-2"
          >
            Change
          </p>
          {showAddress && (
            <div className="mt-3 border rounded-md max-h-60 overflow-y-auto">
              {address.length > 0 ? (
                address.map((item) => (
                  <div
                    key={item._id}
                    onClick={() => {
                      setSelectedAddress(item);
                      setShowAddress(false);
                    }}
                    className={`p-3 text-sm cursor-pointer border-b last:border-b-0 ${
                      selectedAddress?._id === item._id
                        ? "bg-primary/10 border-l-4 border-primary"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <p className="font-semibold">
                      {item.firstName} {item.lastName}
                    </p>
                    <p className="text-gray-600">
                      {item.street}, {item.city}
                    </p>
                  </div>
                ))
              ) : (
                <div className="p-3 text-sm text-gray-500">
                  No address found
                </div>
              )}
              <Link
                href={"/address"}
                className="block p-3 text-primary hover:bg-gray-50 text-sm"
              >
                + Add New Address
              </Link>
            </div>
          )}
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Payment Method</h3>
          <select
            value={paymentOption}
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="ONLINE">Online Payment</option>
          </select>
        </div>
        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span>Price</span>
            <span>${totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (2%)</span>
            <span>${tax}</span>
          </div>
          <div className="flex justify-between font-semibold text-lg pt-2 border-t">
            <span>Total Amount:</span>
            <span>${grandTotal}</span>
          </div>
        </div>
        <button
          onClick={PlaceOrder}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? <Spinner /> : "Place Order"}
        </button>
      </div>
    </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <Image
        src={assets.cart}
        alt="empty cart"
        width={300}
        height={300}
      />
      <h2 className="text-2xl font-semibold mt-4">Your cart is empty!</h2>
      <Link
        href={"/"}
        className="mt-4 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90"
      >
        Start Shopping
      </Link>
    </div>
  );
}

export default page;
