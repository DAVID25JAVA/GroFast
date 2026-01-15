"use client";
import { useEffect, useState } from "react";
import { dummyOrders } from "../../../../public/assets";
import toast from "react-hot-toast";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";
import moment from "moment";
import Loader from "@/components/UI/Loader";

function page() {
  const [orderData, setOrderData] = useState([]);
  const { isLoading, setIsLoading } = useUser();

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      const res = await Api("get", "/order/allorders");
      if (res?.success) {
        setIsLoading(false);
        setOrderData(res?.allorder);
      } else {
        setIsLoading(false);
        toast(res?.message);
      }
    } catch (error) {
      toast(error?.message);
      setIsLoading(false);
    }
  };

   if(isLoading) return <Loader/>

  return (
    <div>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orderData.map((order, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
          >
            <div className="flex gap-5">
              {order?.items?.map((img, index) => (
                <img
                  key={index}
                  className="w-12 h-12 object-cover opacity-60"
                  src={img?.product?.image[0]}
                  alt="boxIcon"
                />
              ))}
              <>
                {order.items.map((item, index) => (
                  <div key={index} className="flex flex-col justify-center">
                    <p className="font-medium">
                      {item.product.name}{" "}
                      <span
                        className={`text-indigo-500 ${
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
                {order.address.state},{order.address.zipCode},{" "}
                {order.address.country}
              </p>
            </div>

            <p className="font-medium text-base my-auto text-black/70">
              ${order.amount}
            </p>

            <div className="flex flex-col text-sm">
              <p>
                Method:{" "}
                <span className="text-green-500">{order.paymentType}</span>
              </p>
              <p>Date:{moment(order.orderDate).format("DD/MM/YYY")}</p>
              <p>
                Payment:{" "}
                <span
                  className={`${
                    order?.isPaid ? "text-green-500" : "text-yellow-500"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Pending"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
