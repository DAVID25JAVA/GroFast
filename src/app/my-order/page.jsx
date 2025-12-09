"use client";
import React, { useState } from "react";
import { dummyOrders } from "../../../public/assets";
import Image from "next/image";
import {
  Package,
  MapPin,
  Calendar,
  CreditCard,
  CheckCircle,
  Clock,
  ShoppingBag,
} from "lucide-react";

function Page() {
  const [expandedOrder, setExpandedOrder] = useState(null);

  return (
    <div className="  bg-leaner-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-8 h-8 text-green-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-700">
              My Orders
            </h1>
          </div>
          <p className="text-gray-600">
            Track your grocery deliveries and order history
          </p>
        </div>

        <div className="space-y-6">
          {dummyOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl   transition-all duration-300 overflow-hidden border border-gray-200"
            >
              {/* Order Content */}
              <div className="p-6">
                <div className="grid lg:grid-cols-[2fr_1.2fr_0.9fr_1fr] gap-6 items-start">
                  {/* Product List */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Items
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                          <Image
                            className="w-16 h-16 rounded-lg object-cover border p-1"
                            src={item?.product?.image[0]}
                            alt={item?.product?.name}
                            width={48}
                            height={48}
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">
                              {item.product.name}
                            </p>
                            {/* {item.quantity > 1 && ( */}
                            <span className="text-sm text-green-600 font-semibold">
                              Qty: {item.quantity}
                            </span>
                            {/* )} */}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5 text-rose-600" />
                      <h3 className="font-semibold text-gray-800 text-lg">
                        Delivery Address
                      </h3>
                    </div>
                    <div className="bg-linear-to-br from-gray-50 to-gray-100 p-4 rounded-xl text-sm space-y-1">
                      <p className="font-semibold text-gray-900">
                        {order.address.firstName} {order.address.lastName}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {order.address.street}, {order.address.city},{" "}
                        {order.address.state}, {order.address.zipcode},{" "}
                        {order.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Amount */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-3">
                      Total Amount
                    </h3>
                    <div className="bg-green-600 text-white  w-20 h-10  rounded-md flex items-center justify-center text-center">
                      <p className="text-base font-bold">${order.amount}</p>
                    </div>
                  </div>

                  {/* Payment & Order Info */}
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg mb-4">
                      Order Details
                    </h3>
                    <div className="space-y-3">
                      {/* Payment Method */}
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <CreditCard className="w-5 h-5 text-blue-600  shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">
                            Payment Method
                          </p>
                          <p className="font-semibold text-gray-800">
                            {order.paymentType}
                          </p>
                        </div>
                      </div>

                      {/* Order Date */}
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        <Calendar className="w-5 h-5 text-purple-600  shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Order Date</p>
                          <p className="font-semibold text-gray-800">
                            {order.orderDate}
                          </p>
                        </div>
                      </div>

                      {/* Payment Status */}
                      <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                        {order.isPaid ? (
                          <>
                            <CheckCircle className="w-5 h-5 text-green-600  shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Status
                              </p>
                              <p className="font-semibold text-green-600">
                                Paid
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <Clock className="w-5 h-5 text-amber-600  shrink-0" />
                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Status
                              </p>
                              <p className="font-semibold text-amber-600">
                                Pending
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
