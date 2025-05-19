import React, { useState } from 'react';
import { FaSearch, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import WishlistDialog from '../pages/WishListPage';
import CartIcon from '../cart/CartIcon';
import SubHeader from './SubHeader';
import SearchBar from './SearchBar';

const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white rounded-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link to="/" className="text-2xl font-bold text-pink-500 tracking-wider">
          Sᗩkᑘᖇᗩ
        </Link>

        <div className="hidden md:flex flex-1 justify-center px-10">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <FaSearch
            className="block md:hidden text-gray-700 cursor-pointer text-lg"
            onClick={() => setShowMobileSearch(!showMobileSearch)}
          />
          <Link to="/profile" className="text-gray-700 hover:text-pink-600">
            <FaUser size={20} />
          </Link>
          <WishlistDialog />
          <CartIcon />
        </div>
      </div>

      {showMobileSearch && (
        <div className="md:hidden px-4 pb-4">
          <SearchBar mobile={true} />
        </div>
      )}

      <SubHeader />
    </header>
  );
};

export default Header;
