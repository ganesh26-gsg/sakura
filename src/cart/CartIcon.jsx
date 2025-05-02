import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import * as Dialog from '@radix-ui/react-dialog';
import useCartStore from '../store/useCartStore';
import CartDialog from './CartDialog';
import useAuthStore from '../store/useCartStore';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const { cart } = useCartStore();
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); 
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleCartOpen = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('Please login to view your cart!');
      navigate('/login');
    }
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
        onClick={handleCartOpen}
         className="relative text-gray-700">
          <FaShoppingCart className="text-xl" />
          {cartItemCount > 0 && (
            <span className="absolute bottom-3.5 left-2 right-0  bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <CartDialog /> 
    </Dialog.Root>
  );
};

export default CartIcon;
