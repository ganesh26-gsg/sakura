import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { FaTrash } from 'react-icons/fa';
import useCartStore from '../store/useCartStore';
import { Link } from 'react-router-dom';

const CartDialog = () => {
  const { cart, removeFromCart } = useCartStore();
  
  const exchangeRate = 82;

  const handleRemove = (id) => {
    removeFromCart(id);
  };
  

  const totalPriceInINR = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  ) * exchangeRate;

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm bg-black/50 z-40" />

      <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[90%] max-w-xl p-6 max-h-[85vh] overflow-y-auto animate-fade-in">

        <div className="relative ">
          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 text-3xl text-gray-500 hover:text-red-600 transition"
            >
              &times;
            </button>
          </Dialog.Close>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start border p-3 rounded-lg hover:shadow-sm transition"
              >
                <div className="flex gap-4">
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/100'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-md border"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">{item.title}</p>
                    <p className="text-sm text-gray-500">₹{(item.price * exchangeRate).toFixed(0)}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove from cart"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        )}

        {cart.length > 0 && (
          <div className="mt-6 text-right text-lg font-semibold border-t pt-4">
            Total: <span className="text-green-600 font-bold">₹{totalPriceInINR.toFixed(0)}</span>
          </div>
        )}

        {cart.length > 0 && (
          <Dialog.Close asChild>
            <Link to="/checkout">
              <button className="mt-6 w-full button-2 text-white py-2 rounded-lg font-medium  transition shadow-md" >
                Proceed to Checkout
              </button>
            </Link>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default CartDialog;
