import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { RiHeartFill, RiCloseCircleFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import useWishlistStore from '../store/useWhishListStore';
import useAuthStore from '../store/useCartStore';

const WishlistDialog = () => {
  const { wishlist, removeFromWishlist } = useWishlistStore(); 
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromWishlist(id); 
  };

  const handleWishlistOpen = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      alert('Please login to view your wishlist!');
      navigate('/login');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          onClick={handleWishlistOpen}
          className="flex items-center gap-1 text-red-600 px-3 py-2 hover:bg-red-100 rounded transition"
        >
          <RiHeartFill className="text-2xl" />
          <span className="hidden md:inline font-medium">Wishlist</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl w-[90%] max-w-2xl p-6 max-h-[80vh] overflow-y-auto animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-2xl font-bold">Your Wishlist</Dialog.Title>
            <Dialog.Close asChild>
              <button className="text-gray-500 hover:text-red-600 text-2xl transition">
                <RiCloseCircleFill />
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Description className="text-gray-500 mb-6">
            View and manage the items you love.
          </Dialog.Description>

          {wishlist.length === 0 ? (
            <p className="text-center text-gray-600 text-lg">Your wishlist is empty.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-5">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="relative border rounded-lg p-4 hover:shadow-lg transition group"
                >
                  <img
                    src={item.images?.[0] || 'https://via.placeholder.com/150'}
                    alt={item.title}
                    className="w-full h-[200px] object-contain rounded-md mb-2"
                  />
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="absolute top-2 right-2 text-red-600 text-2xl hover:scale-110 transition"
                  >
                    <RiCloseCircleFill />
                  </button>

                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 font-medium mt-1">₹{item.price * 82}</p>

                  <Dialog.Close asChild>
                    <Link
                      to={`/product/${item.id}`}
                      className="text-blue-600 mt-2 inline-block text-sm font-medium underline underline-offset-2 hover:text-blue-800 transition"
                    >
                      View Details
                    </Link>
                  </Dialog.Close>
                </div>
              ))}
            </div>
          )}

          <Dialog.Close asChild>
            <button className="mt-6 bg-gray-700 hover:bg-gray-900 text-white px-5 py-2 rounded-lg font-medium transition">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default WishlistDialog;
