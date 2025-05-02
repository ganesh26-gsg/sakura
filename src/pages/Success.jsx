import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { PartyPopper } from 'lucide-react';

const Success = () => {
  const location = useLocation();
  const order = location.state;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex flex-col items-center justify-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md w-full text-center">
        <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Order Successful!</h1>
        <p className="flex text-gray-600 ml-24 mb-4">Thank you for your order <PartyPopper className='text-pink-800' /> </p>

        <div className="bg-gray-100 rounded-lg p-4 text-left">
          <p className="text-sm text-gray-500 mb-1">Order ID</p>
          <p className="text-md font-semibold text-gray-700 mb-3">{order?.id}</p>

          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Name:</strong> {order?.name}</p>
            <p><strong>Email:</strong> {order?.email}</p>
            <p><strong>Phone:</strong> {order?.phone}</p>
            <p><strong>Payment:</strong> {order?.paymentMethod}</p>
            <p><strong>Total:</strong> ₹{order?.total}</p>
          </div>
        </div>

        <Link
          to="/profile"
          className="inline-block mt-6 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          View Orders
        </Link>

        <Link
          to="/"
          className="block mt-3 text-sm text-blue-500  hover:text-blue-700"
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default Success;
