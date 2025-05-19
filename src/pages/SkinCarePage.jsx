import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header';
import { FaFilter, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SkincarePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [brandOpen, setBrandOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const exchangeRate = 82;
   
  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/beauty')
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
      })
      .catch((err) => {
        console.error('Error fetching skincare products:', err);
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
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((beauty) =>
          updated.some((title) =>
            beauty.title.toLowerCase().includes(title.toLowerCase())
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
              className="absolute -right-3 top-10 transform -translate-y-1/2 bg-white border rounded-full p-1 shadow"
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
                  {products.map((product) => (
                    <label key={product.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTitles.includes(product.title)}
                        onChange={() => handleCheckboxChange(product.title)}
                        className="accent-blue-600"
                      />
                      <span>{product.title}</span>
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
              className="absolute -right-3 top-10 transform -translate-y-1/2 bg-white border rounded-full p-1 shadow"
            >
              <FaChevronRight />
            </button>
            <FaFilter className="text-xl" />
          </div>
        )}

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-3 shadow-sm group relative overflow-hidden"
            >
              <Link to={`/skincare/${product.id}`} className="block relative">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-56 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                />
                <button
                  className="absolute left-1/2 transform -translate-x-1/2
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  button-3 text-white font-semibold text-sm px-4 py-2 rounded-2xl
                  shadow z-20 "
                >
                  Shop Now
                </button>
              </Link>
              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <h1 className="text-sm font-medium mt-2">{product.title}</h1>
                <p className="text-gray-700 font-semibold">
                  ₹{(product.price * exchangeRate).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SkincarePage;
