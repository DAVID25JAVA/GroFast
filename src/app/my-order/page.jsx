import React from "react";
import { dummyOrders } from "../../../public/assets";
import Image from "next/image";
import { ChevronRight, Package, Clock, CheckCircle } from "lucide-react";

function Page() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-700">My Orders</h1>
        </div>

        {/* Orders List */}
        <div className="space-y-3">
          {dummyOrders.map((order, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
            >
              {/* Order Header */}
              <div className="px-4 py-3 bg-white border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      order.isPaid ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <div>
                    <p className="text-xs text-gray-500">Order Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {order.orderDate}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-base font-bold text-gray-900">
                      ${order.amount}
                    </p>
                  </div>
                  {order.isPaid ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                </div>
              </div>

              {/* Items Section */}
              <div className="px-4 py-4">
                <div className="flex items-start gap-3 mb-4">
                  {/* Product Images */}
                  <div className="flex -space-x-2">
                    {order?.items?.slice(0, 3).map((img, idx) => (
                      <div key={idx} className="relative">
                        <Image
                          className="w-12 h-12 rounded-lg object-cover border-2 border-white shadow-sm"
                          src={img?.product?.image[0]}
                          alt={img?.product?.name}
                          width={48}
                          height={48}
                        />
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 rounded-lg bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center">
                        <span className="text-xs font-semibold text-gray-600">
                          +{order.items.length - 3}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Items List */}
                  <div className="flex-1">
                    {order.items.slice(0, 2).map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-700 mb-1">
                        {item.product.name}
                        {item.quantity > 1 && (
                          <span className="text-gray-500">
                            {" "}
                            × {item.quantity}
                          </span>
                        )}
                      </p>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-xs text-gray-500 mt-1">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                  <p className="text-sm font-medium text-gray-900">
                    {order.address.firstName} {order.address.lastName}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {order.address.street}, {order.address.city},{" "}
                    {order.address.state} {order.address.zipcode}
                  </p>
                </div>

                {/* Payment Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Payment:</span>
                    <span className="text-xs font-medium text-gray-700">
                      {order.paymentType}
                    </span>
                  </div>
                  <div
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      order.isPaid
                        ? "bg-green-50 text-green-700"
                        : "bg-yellow-50 text-yellow-700"
                    }`}
                  >
                    {order.isPaid ? "Paid" : "Pending"}
                  </div>
                </div>
              </div>

              {/* Footer Action */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                <button className="w-full flex items-center justify-between text-sm font-medium text-purple-600 hover:text-purple-700">
                  <span>View Details</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {dummyOrders.length === 0 && (
          <div className="bg-white rounded-lg p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No orders yet
            </h3>
            <p className="text-sm text-gray-500">
              Your orders will appear here once you make a purchase
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
