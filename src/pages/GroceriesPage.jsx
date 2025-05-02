import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header';
import { FaFilter, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const GroceriesPage = () => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [brandOpen, setBrandOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const exchangeRate = 82;

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/groceries')
      .then((res) => {
        setProducts(res.data.products);
        setFiltered(res.data.products);
      })
      .catch((err) => {
        console.error('Error fetching groceries:', err);
      });
  }, []);

  const handleCheckboxChange = (title) => {
    const updated = [...selectedTitles];
    if (updated.includes(title)) {
      updated.splice(updated.indexOf(title), 1);
    } else {
      updated.push(title);
    }
    setSelectedTitles(updated);

    if (updated.length === 0) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((item) =>
          updated.some((title) =>
            item.title.toLowerCase().includes(title.toLowerCase())
          )
        )
      );
    }
  };

  

  return (
    <>
      <Header />
      <div className="flex pagePadding">
        {sidebarOpen ? (
          <div className="w-64 p-4 border-r relative">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute -right-3 top-4 bg-white border rounded-full p-1 shadow"
            >
              <FaChevronLeft />
            </button>
            <h2 className="text-xl font-bold mb-6">Filter</h2>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setBrandOpen(!brandOpen)}
              >
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <FaFilter /> Product
                </h3>
                {brandOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {brandOpen && (
                <div className="mt-3 space-y-2">
                  {products.map((item) => (
                    <label key={item.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTitles.includes(item.title)}
                        onChange={() => handleCheckboxChange(item.title)}
                        className="accent-green-600"
                      />
                      <span>{item.title}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-12 p-2 border-r flex flex-col items-center relative">
            <button
              onClick={() => setSidebarOpen(true)}
              className="absolute -right-3 top-4 bg-white border rounded-full p-1 shadow"
            >
              <FaChevronRight />
            </button>
            <FaFilter className="text-xl" />
          </div>
        )}

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-3 shadow-sm group relative overflow-hidden"
            >
              <Link to={`/groceries/${item.id}`} className="block relative">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-56 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute left-1/2 transform -translate-x-1/2
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  bg-green-600 text-white font-semibold text-sm px-4 py-2 rounded-md
                  shadow hover:bg-gray-800 z-10"
                >
                  Shop Now
                </button>
              </Link>
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <h1 className="text-sm font-medium mt-2">{item.title}</h1>
                <p className="text-gray-700 font-semibold">
                  ₹{(item.price * exchangeRate).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GroceriesPage;
