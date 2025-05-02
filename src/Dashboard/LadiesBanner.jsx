import React from 'react';
import ladiesBanner from '../assets/ladiesBanner.gif';
import { Link } from 'react-router-dom';

const LadiesBanner = () => {
  return (
    <div className="relative mt-3 px-6"> 
      <img 
        src={ladiesBanner} 
        alt="Ladies Banner" 
        className="w-full rounded-3xl" 
      />
      <div className="absolute inset-0 flex flex-col items-center ml-[850px] mt-24 text-white text-center px-4">
       <Link to='/women'>
       <button className=" sm:hidden md:hidden lg:block sm:mt-2.5 px-3 py-3 md:w-52 mr-0 sm:mr-16 bg-black text-white rounded-lg button-2 hover:scale-110 transition-transform duration-200">
          Shop Now
        </button>
       </Link>
      </div>
    </div>
  );
};

export default LadiesBanner;
