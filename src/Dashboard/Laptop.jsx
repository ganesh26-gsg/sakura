import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Lapbanner from '../assets/Lapbanner.jpg';

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/laptops')
      .then((res) => {
        setLaptops(res.data.products.slice(0, 4));
      })
      .catch((err) => {
        console.error('Error fetching laptops:', err);
      });
  }, []);

  if (laptops.length === 0) return <div className="p-8 text-center">Loading laptops...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Top selling Laptops</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-2 group relative overflow-hidden rounded-lg">
          <img
            src={Lapbanner}
            alt="Offer Banner"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />

        <Link to='/laptop'>
        <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2
              opacity-0 group-hover:opacity-100 transition-all duration-300
              button-1
              text-sm px-6 py-2 rounded-full shadow-lg hover:scale-105"
          >
            Shop Now
          </button>
        </Link>
        </div>

        <div className="md:col-span-3 grid grid-cols-2 gap-6">
          {laptops.map((laptop) => (
            <div
              key={laptop.id}
              className="group relative bg-[#f5f5f5] p-4 rounded-lg overflow-hidden shadow-md"
            >
              <Link to="/laptop">
                <img
                  src={laptop.thumbnail}
                  alt={laptop.title}
                  className="w-full h-56 object-contain mb-2 transition-transform duration-300 group-hover:scale-105"
                />
              

              <button
                className="absolute top-44 left-1/2 transform -translate-x-1/2 translate-y-8
                  opacity-0 group-hover:opacity-100 transition-all duration-1000
                  button-3 text-white font-semibold text-sm px-4 py-2 rounded-md
                  shadow "
              >
                Select Option
              </button>
              </Link>

              <h3 className="text-center text-sm font-semibold mt-4 group-hover:hidden">
                {laptop.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laptops;
