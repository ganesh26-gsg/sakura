import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Mobiles = () => {
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/smartphones')
      .then((response) => {
        setMobiles(response.data.products.slice(0, 4));
      })
      .catch((error) => {
        console.error('Error fetching mobiles:', error);
      });
  }, []);

  if (mobiles.length === 0) return <div className="p-8 text-center">Loading mobiles...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center">Featured Smartphones</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {mobiles.map((mobile) => (
          <div key={mobile.id} className="group relative bg-[#f5f5f5] p-8 rounded-lg overflow-hidden shadow-lg">
            <Link to="/mobile">
              <img
                src={mobile.images[0]}
                alt={mobile.title}
                className="w-full h-56 object-contain transition-transform duration-300 group-hover:scale-110"
              />

            <button
              className="absolute top-60 left-1/2 transform -translate-x-1/2 translate-y-8
                opacity-0 group-hover:opacity-100 transition-all duration-1000
                button-3 text-white font-semibold text-sm px-5 py-2 rounded-lg
                shadow-md "
            >
              Select Option
            </button>
            </Link>

            <h3 className="text-center text-sm font-semibold mt-4 group-hover:hidden">{mobile.title}</h3>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Mobiles;
