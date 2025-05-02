import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiUser, HiMail, HiPhone } from 'react-icons/hi';
import { FaMoneyBillWave, FaShoppingCart } from 'react-icons/fa';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-white py-10 px-4">
      <h1 className="text-4xl font-extrabold text-center text-black mb-10 drop-shadow">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No orders found.</p>
      ) : (
        <div className="grid gap-8 max-w-4xl mx-auto">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white shadow-xl rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
            >
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700">
                  Order ID: <span className="text-pink-600">{order.id}</span>
                </h2>
                
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <p className="flex items-center gap-2"><HiUser /> <span className="font-medium">Name:</span> {order.name}</p>
                <p className="flex items-center gap-2"><HiMail /> <span className="font-medium">Email:</span> {order.email}</p>
                <p className="flex items-center gap-2"><HiPhone /> <span className="font-medium">Phone:</span> {order.phone}</p>
                <p className="flex items-center gap-2"><FaMoneyBillWave /> <span className="font-medium">Payment:</span> {order.paymentMethod}</p>
              </div>

              <div className="mt-5 border-t pt-4">
                <p className="text-base font-semibold text-gray-700 mb-2"><FaShoppingCart/> Items Ordered:</p>
                <ul className="space-y-1 text-sm">
                  {order.cart.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <span>{item.title} x {item.quantity}</span>
                      <span className="text-gray-800 font-medium">
                        ₹{(item.price * item.quantity * 82).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex justify-end items-center">
                <span className="text-lg font-bold text-green-700">
                  Total: ₹{order.total}
                </span>
              </div>

              <Link to="/" className="block text-center mt-4 text-pink-600  hover:text-gray-900">
                Home
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
