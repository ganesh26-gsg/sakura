import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header';
import { FaFilter, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LaptopPage = () => {
  const [laptops, setLaptops] = useState([]);
  const [filteredLaptops, setFilteredLaptops] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [brandOpen, setBrandOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/laptops')
      .then((response) => {
        setLaptops(response.data.products);
        setFilteredLaptops(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching laptops:', error);
      });
  }, []);

  const handleCheckboxChange = (title) => {
    const updatedTitles = [...selectedTitles];
    if (updatedTitles.includes(title)) {
      const index = updatedTitles.indexOf(title);
      updatedTitles.splice(index, 1);
    } else {
      updatedTitles.push(title);
    }
    setSelectedTitles(updatedTitles);

    if (updatedTitles.length === 0) {
      setFilteredLaptops(laptops);
    } else {
      setFilteredLaptops(
        laptops.filter((laptop) =>
          updatedTitles.some((title) =>
            laptop.title.toLowerCase().includes(title.toLowerCase())
          )
        )
      );
    }
  };

  const exchangeRate = 82;

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
                  <FaFilter /> Brand
                </h3>
                {brandOpen ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {brandOpen && (
                <div className="mt-3 space-y-2">
                  {laptops.map((laptop) => (
                    <label key={laptop.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTitles.includes(laptop.title)}
                        onChange={() => handleCheckboxChange(laptop.title)}
                        className="accent-pink-600"
                      />
                      <span>{laptop.title}</span>
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
              className="absolute -right-3 top-10  transform -translate-y-1/2 bg-white border rounded-full p-1 shadow"
            >
              <FaChevronRight />
            </button>
            <FaFilter className="text-xl" />
          </div>
        )}

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-6 p-4">
          {filteredLaptops.map((laptop) => (
            <div
              key={laptop.id}
              className="border rounded-lg p-3 shadow-sm group relative overflow-hidden"
            >
              <Link to={`/laptops/${laptop.id}`} className="block relative">
                <img
                  src={laptop.images[0]}
                  alt={laptop.title}
                  className="w-full h-56 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  className="absolute  left-1/2 transform -translate-x-1/2
                  opacity-0 group-hover:opacity-100 transition-all duration-300
                  button-3 text-white font-semibold text-sm px-4 py-2 rounded-md
                  shadow "
                >
                  Shop Now
                </button>
              </Link>

              <div className="transition-opacity duration-300 group-hover:opacity-0">
                <h1 className="text-sm font-medium mt-2">{laptop.title}</h1>
                <p className="text-gray-700 font-semibold">
                  ₹{(laptop.price * exchangeRate).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default LaptopPage;
