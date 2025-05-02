import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '../store/useSearchStore';

const SearchBar = ({ mobile = false }) => {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      setSuggestions(data.products);
    } catch (err) {
      console.error("Suggestion fetch error:", err);
      setSuggestions([]);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      const res = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
      const data = await res.json();

      if (data.products.length > 0) {
        navigate(`/product/${data.products[0].id}`);
        setSuggestions([]);
        setSearchQuery("");
      } else {
        alert("No product found!");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <input
        type="text"
        placeholder="Search..."
        className={`w-full p-2 pl-10 pr-4 rounded-full border text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 ${mobile ? '' : 'border-none'}`}
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
      />
      <FaSearch
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 cursor-pointer"
        onClick={handleSearch}
      />

      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-50 max-h-60 overflow-y-auto">
          {suggestions.map((item) => (
            <li
              key={item.id}
              className="p-2 text-sm hover:bg-gray-200 cursor-pointer"
              onClick={() => {
                navigate(`/product/${item.id}`);
                setSuggestions([]);
                setSearchQuery(item.title);
              }}
            >
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
