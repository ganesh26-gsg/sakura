import React from 'react';
import useAuthStore from '../store/useCartStore';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    localStorage.removeItem('orders');
    logout();
    alert("Logged out successfully!");
  };

  return (
    <div>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Logout
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="bg-black/40 fixed inset-0" />
          <AlertDialog.Content className="bg-white rounded-lg shadow-lg p-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-md">
            <AlertDialog.Title className="text-lg font-bold mb-2">
              Logout
            </AlertDialog.Title>
            <AlertDialog.Description className="text-sm text-gray-600 mb-4">
            Are you sure you want to log out?
            </AlertDialog.Description>
            <div className="flex justify-end gap-3">
              <AlertDialog.Cancel asChild>
                <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
                  Cancel
                </button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                >
                  Logout
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </div>
  );
};

export default Logout;
