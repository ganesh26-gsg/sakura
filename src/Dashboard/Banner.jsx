import React from 'react';
import banner3 from '../assets/banner3.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <div className="w-full px-4 md:px-8 lg:px-16 py-6">
      <div className="relative max-w-7xl mx-auto overflow-hidden rounded-xl shadow-md">
        <img
          src={banner3}
          alt="Banner"
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/10 text-center px-4">
          <Link to="/tops">
            <button className="mt-4 px-6 sm:py-2 lg:py-2 bg-white text-black hover:bg-pink-500 hover:scale-110 transition-transform duration-300 rounded-2xl">
              Shop Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
