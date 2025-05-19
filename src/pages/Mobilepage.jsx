import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header';
import { FaFilter, FaChevronLeft, FaChevronRight, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MobilePage = () => {
  const [mobiles, setMobiles] = useState([]);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(true);
  const exchangeRate = 82;

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/smartphones')
      .then((response) => {
        setMobiles(response.data.products); 
        setFilteredMobiles(response.data.products); 
      })
      .catch((error) => {
        console.error('Error fetching mobiles:', error);
      });
  }, []);

  const handleCheckboxChange = (title) => {
    const updatedTitles = [...selectedTitles];
    if (updatedTitles.includes(title)) {
      updatedTitles.splice(updatedTitles.indexOf(title), 1);
    } else {
      updatedTitles.push(title);
    }
    setSelectedTitles(updatedTitles);

    if (updatedTitles.length === 0) {
      setFilteredMobiles(mobiles); 
    } else {
      setFilteredMobiles(
        mobiles.filter((mobile) =>
          updatedTitles.some((title) =>
            mobile.title.toLowerCase().includes(title.toLowerCase())
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
                  {mobiles.map((mobile) => (
                    <label key={mobile.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedTitles.includes(mobile.title)}
                        onChange={() => handleCheckboxChange(mobile.title)}
                        className="accent-blue-600"
                      />
                      <span>{mobile.title}</span>
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
               
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {filteredMobiles.length === 0 ? (
            <div>Loading...</div>
          ) : (
            filteredMobiles.map((mobile) => (     
              <div key={mobile.id} className="border rounded-lg p-3 shadow-sm group relative overflow-hidden">
                <Link to={`/mobiles/${mobile.id}`} className="block relative">
                  <img
                    src={mobile.images[0]}
                    alt={mobile.title}
                    className="w-full h-96 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    className="absolute top-96 left-1/2 transform -translate-x-1/2
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    button-3 text-white font-semibold text-sm px-2 py-2 rounded-2xl
                    shadow hover:bg-gray-800 z-10"
                  >
                    Shop Now
                  </button>
                </Link>
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <h1 className="text-sm font-medium mt-2">{mobile.title}</h1>
                  <p className="text-gray-700 font-semibold">
                    ₹{(mobile.price * exchangeRate).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default MobilePage;
