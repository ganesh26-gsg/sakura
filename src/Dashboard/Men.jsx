import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Mens = () => {
  const [menShirt, setMenShirt] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/mens-shirts?limit=4')
      .then((res) => {
        setMenShirt(res.data.products);
      })
      .catch((err) => {
        console.error('Error fetching men shirts:', err);
      });
  }, []);

  if (menShirt.length === 0) return <div className="p-8 text-center">Loading Men Shirts...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center"> Men's Shirts</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {menShirt.map((item) => (
          <div key={item.id} className="group relative bg-[#f5f5f5] p-4 rounded-lg overflow-hidden shadow-lg">
            <Link to="/men">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-40 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
              />

            <button
              className="absolute top-36 left-1/2 transform -translate-x-1/2 translate-y-8
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
    </div>
  );
};

export default Mens;
