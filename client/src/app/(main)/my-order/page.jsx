'use client'
import { Api } from "@/components/API/Api";
import Loader from "@/components/UI/Loader";
import { useUser } from "@/context/userContext";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const page = () => {
  const [order, setOrders] = useState([]);
  const { isLoading, setIsLoading, user } = useUser();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const res = await Api("get", "/order/orderByUser",);
      if (res.success) {
        setIsLoading(false);
        setOrders(res?.orderData)
      } else {
        toast.error(res?.message);
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  if(isLoading) return <Loader/>

   
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-24 flex flex-col items-center min-h-screen">
      <div className="w-full space-y-3 max-w-6xl lg:px-10 text-gray-700">
        <h2 className="text-lg sm:text-xl md:text-2xl font-medium">
          Orders List
        </h2>
        {order.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5   rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              <img
                className="w-12 h-12 object-cover"
                src={order?.items[0]?.product?.image[0]}
                alt="boxIcon"
              />
              <>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.product.tittle}{" "}
                      <span
                        className={`text-green-500 ${
                          item.quantity < 2 && "hidden"
                        }`}
                      >
                        x {item.quantity}
                      </span>
                    </p>
                  </div>
                ))}
              </>
            </div>

            <div className="text-sm">
              <p className="font-medium mb-1">
                {order.address.firstName} {order.address.lastName}
              </p>
              <p>
                {order.address.street}, {order.address.city},{" "}
                {order.address.state},{order.address.zipcode},{" "}
                {order.address.country}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-green-500">
              ${order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p className="text-purple-500 font-semibold">Method:  <span className="text-green-500 font-normal">{order.paymentType}</span></p>
              <p>Date: {moment(order.updatedAt).format("DD/MM/YYYY")}</p>
              <p className={`text-purple-500 font-semibold`}>Payment:  <span className={`${order?.isPaid ?"text-green-500":"text-yellow-500"}`}>{order.isPaid ? "Paid" : "Pending"}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
