import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Furnitures = () => {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/furniture')
      .then((res) => {
        setFurniture(res.data.products.slice(0, 4));
      })
      .catch((err) => {
        console.error('Error fetching furniture:', err);
      });
  }, []);

  if (furniture.length === 0) return <div className="p-8 text-center">Loading Furniture...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-8 text-center"> Furniture</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {furniture.map((item) => (
          <div key={item.id} className="group relative bg-[#f5f5f5] p-4 rounded-lg overflow-hidden shadow-lg">
            <Link to="/furniture">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-60 object-contain mb-2 transition-transform duration-300 group-hover:scale-110"
              />
            </Link>

            <Link to={`/furniture/${item.id}`} key={item.id}>
            
            <button
              className="absolute top-56 left-1/2 transform -translate-x-1/2 translate-y-8
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
    </div>
  );
};

export default Furnitures;
