import React from 'react';
import saakura3 from '../assets/Saakura3.jpg'
import Logout from '../auth/Logout';
import { ArrowRight } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-10 px-6 mt-10 rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
        
        <div>
          <h2 className="text-xl font-bold mb-4 text-gray-600">Stay Connected</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Enquiry submitted!");
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask your enquiry..."
              className="bg-white text-black px-4 py-2 rounded-md w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-pink-600 text-white p-2 rounded-full transition-transform hover:scale-110"
            >
              <ArrowRight size={24} />
            </button>
          </form>
        </div>

        <div className="flex flex-col items-center">
          <img
            src={saakura3}
            alt="Saakura Logo"
            className="h-36 w-28 object-cover   mb-4"
          />
          <Logout />
        </div>

        <div className="text-center md:text-right">
          <h3 className="text-2xl font-bold text-gray-600 mb-2">SAKURA</h3>
          <p className="text-sm">© 2025 All rights reserved.</p>
          <p className="text-sm text-gray-500 mt-2">
            Need help?{' '}
            <a
              href="mailto:support@saakura.com"
              className="text-gray-500 underline hover:text-pink-300"
            >
              support@saakura.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
