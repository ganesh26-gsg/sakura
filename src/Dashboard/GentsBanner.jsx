import React from 'react';
import gentsBanner from '../assets/gentsBanner.gif';
import { Link } from 'react-router-dom';

const GentsBanner = () => {
  return (
    <div className="relative mt-3 px-6">
      <img 
        src={gentsBanner} 
        alt="Gents Banner" 
        className="w-full rounded-3xl" 
      />
      <div className="absolute inset-0 flex flex-col items-center ml-[850px] mt-24 text-white text-center px-4">
        <Link to='/men' >
        <button className="sm:hidden md:hidden lg:block sm:mt-2 px-3 py-3 sm:w-52 mr-0 sm:mr-16 bg-black text-white rounded-lg button-2 hover:scale-110 transition-all duration-200">
          Shop Now
        </button>
        </Link>
      </div>
    </div>
  );
};

export default GentsBanner;
