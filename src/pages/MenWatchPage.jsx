import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Dashboard/Header';
import { FaFilter, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SubHeader from '../Dashboard/SubHeader';
import { Link } from 'react-router-dom';

const MensWatchPage = () => {
  const [watches, setWatches] = useState([]);
  const [filteredWatches, setFilteredWatches] = useState([]);
  const [selectedTitles, setSelectedTitles] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const exchangeRate = 82;

  useEffect(() => {
    axios.get('https://dummyjson.com/products/category/mens-watches')
      .then((response) => {
        setWatches(response.data.products);
        setFilteredWatches(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching mens watches:', error);
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
      setFilteredWatches(watches);
    } else {
      setFilteredWatches(
        watches.filter((watch) =>
          updatedTitles.some((title) =>
            watch.title.toLowerCase().includes(title.toLowerCase())
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
              {watches.map((watch) => (
                <label key={watch.id} className="flex items-center gap-2 mb-3">
                  <input
                    type="checkbox"
                    checked={selectedTitles.includes(watch.title)}
                    onChange={() => handleCheckboxChange(watch.title)}
                    className="accent-blue-600"
                  />
                  {watch.title}
                </label>
              ))}
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
          {filteredWatches.length === 0 ? (
            <div>Loading...</div>
          ) : (
            filteredWatches.map((watch) => (
              <div key={watch.id} className="border rounded-lg p-8 shadow-sm group relative overflow-hidden">
                <Link to={`/menwatches/${watch.id}`} className="block relative">
                  <img
                    src={watch.images[0]}
                    alt={watch.title}
                    className="w-full h-56 object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    className="absolute left-1/2 transform -translate-x-1/2
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    button-3 text-white font-semibold text-sm px-4 py-2 rounded-2xl
                    shadow z-10"
                  >
                    ShopNow
                  </button>
                </Link>
                <div className="transition-opacity duration-300 group-hover:opacity-0">
                  <h1 className="text-sm font-medium mt-2">{watch.title}</h1>
                  <p className="text-gray-700 font-semibold">
                    ₹{(watch.price * exchangeRate).toFixed(2)}
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

export default MensWatchPage;
