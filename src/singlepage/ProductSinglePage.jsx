import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Dashboard/Header';
import useCartStore from '../store/useCartStore';
import useWishlistStore from '../store/useWhishListStore';
import { RiHeartFill } from 'react-icons/ri';

const ProductSinglePage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  const exchangeRate = 82;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setSelectedImage(res.data.images[0]); 
      })
      .catch((err) => console.error('Error fetching product:', err));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    if (wishlist.some(item => item.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  if (!product) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center h-96 text-gray-600 text-lg">Loading...</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-4">
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-[400px] object-contain rounded-lg border"
          />

          <div className="flex gap-3 flex-wrap">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setSelectedImage(img)}
                className={`h-20 w-20 object-cover rounded-lg cursor-pointer border-2 ${
                  selectedImage === img ? 'border-pink-600' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-xl font-semibold text-pink-700">
            ₹{(product.price * exchangeRate).toFixed(2)}
          </p>

          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>

          <button
            onClick={handleWishlist}
            className={`text-3xl w-fit transition-all duration-300 ${
              wishlist.some(item => item.id === product.id)
                ? 'text-red-500 hover:scale-125'
                : 'text-gray-400 hover:text-red-500 hover:scale-110'
            }`}
          >
            <RiHeartFill />
          </button>

          <button
            onClick={handleAddToCart}
            className="button-1 text-white font-bold py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductSinglePage;
