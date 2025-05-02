import React, { useState } from 'react';
import useCartStore from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';
import Header from '../Dashboard/Header';

const Checkout = () => {
  const { cart,clearCart } = useCartStore();
  const navigate = useNavigate();
  const exchangeRate = 82;

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
    paymentMethod: 'UPI',
  });

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) * exchangeRate;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.address || !form.phone || !form.paymentMethod) {
      alert('Please fill all the fields');
      return;
    }

    const orderId = 'ORDER-' + Date.now();
    const orderData = {
      id: orderId,
      ...form,
      cart,
      total: totalPrice.toFixed(2),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));

    navigate('/success', { state: orderData });
    clearCart();
  };
  

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 grid md:grid-cols-2 gap-8">

          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Billing Details</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="text"
              name="address"
              placeholder="Delivery Address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <div>
              <h3 className="text-lg font-semibold mt-4">Payment Method</h3>
              <label className="block mt-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={form.paymentMethod === 'UPI'}
                  onChange={handleChange}
                />{' '}
                UPI
              </label>
              <label className="block mt-1">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === 'COD'}
                  onChange={handleChange}
                />{' '}
                Cash on Delivery (COD)
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2 button-3 text-white font-semibold rounded-md transition"
            >
              Confirm Order
            </button>
          </form>

          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium text-gray-700">{item.title}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    ₹{(item.price * item.quantity * exchangeRate).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 text-right text-xl font-bold text-green-600">
              Total: ₹{totalPrice.toFixed(2)}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Checkout;
