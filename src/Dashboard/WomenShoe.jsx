import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import shoebanner from '../assets/shoebanner.jpg'
const WomenShoe = () => {
  const [shoe, setShoe] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/womens-shoes?limit=4')
      .then((res) => {
        setShoe(res.data.products);
      })
      .catch((err) => {
        console.error('Error fetching shoes:', err);
      });
  }, []);

  if (shoe.length === 0)
    return <div className="p-8 text-center"> Women Shoes...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Featured Women Shoes</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3 grid grid-cols-2 gap-6">
          {shoe.map((item) => (
            <div key={item.id} className="group relative bg-[#f5f5f5] p-4 rounded-lg overflow-hidden shadow-md">
              <Link to="/womensshoes">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-60 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                />

              <button
                className="absolute top-56 left-1/2 transform -translate-x-1/2 translate-y-8
                  opacity-0 group-hover:opacity-100 transition-all duration-1000
                  button-3 text-white font-semibold text-sm px-5 py-2 rounded-md
                  shadow-md"
              >
                Select Option
              </button>
              </Link>

              <h3 className="text-center text-sm font-semibold mt-4 group-hover:hidden">{item.title}</h3>
            </div>
          ))}
        </div>

        <div className="md:col-span-2 group relative overflow-hidden rounded-lg">
          <img
            src={shoebanner}
            alt="Women Shoe Banner"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />

          <button
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2
              opacity-0 group-hover:opacity-100 hover:bg-black transition-all duration-300
              button-1 text-white font-semibold
              text-sm px-6 py-2 rounded-full shadow-lg hover:scale-105"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default WomenShoe;
