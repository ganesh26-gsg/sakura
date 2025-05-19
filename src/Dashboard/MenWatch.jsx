import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import watchbanner from '../assets/watchbanner.jpg'
const Menwatch = () => {
  const [menwatch, setMenwatch] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/mens-watches?limit=4')
      .then((res) => {
        setMenwatch(res.data.products);
      })
      .catch((err) => {
        console.error('Error fetching men watches:', err);
      });
  }, []);

  if (menwatch.length === 0)
    return <div className="p-8 text-center">Loading Men Watches...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center"> Men Watches</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
        <div className="md:col-span-3 grid grid-cols-2 gap-6">
          {menwatch.map((item) => (
            <div key={item.id} className="group relative bg-[#f5f5f5] p-4 rounded-lg overflow-hidden shadow-lg">
              <Link to="/menswatches">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-60 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
                />

              <button
                className="absolute top-52 left-1/2 transform -translate-x-1/2 translate-y-8
                  opacity-0 group-hover:opacity-100 transition-all duration-1000
                  button-3 text-white font-semibold text-sm px-5 py-2 rounded-md
                  shadow-md "
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
            src={watchbanner}
            alt="Men Watch Banner"
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
          />

          <button
            className="absolute bottom-4 left-[300px] transform -translate-x-1/2
              opacity-0 group-hover:opacity-100 transition-all duration-300
              button-1
              text-sm px-6 py-2 rounded-full shadow-lg hover:scale-105"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menwatch;
