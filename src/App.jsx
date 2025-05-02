import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './Dashboard/LandingPage';
import MobilePage from './pages/Mobilepage';
import LaptopPage from './pages/LaptopPage';
import MensShirtPage from './pages/MensShirts';
import MensWatchPage from './pages/MenWatchPage';
import MensShoePage from './pages/MensShoePage';
import TopsPage from './pages/WomensTopsPage';
import WomensShoePage from './pages/WomenShoepage';
import WomensBagsPage from './pages/WomensBagpage';
import FragrancesPage from './pages/FragrancePage';
import SkincarePage from './pages/SkinCarePage';
import FurniturePage from './pages/FurniturePage';
import GroceriesPage from './pages/GroceriesPage';


import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import WishlistDialog from './pages/WishListPage';
import ProductSinglePage from './singlepage/ProductSinglePage';
import Profile from './auth/Profile';
import PrivateRoute from './auth/ProtectecdRoute';
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import Orders from './pages/Orders';
import CartDialog from './cart/CartDialog';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        

        <Route path="/mobile" element={<MobilePage />} />
        <Route path="/electronics" element={<MobilePage />} />
        <Route path="/ac" element={<MobilePage />} />

        <Route path="/laptop" element={<LaptopPage />} />
        <Route path="/mensshirts" element={<MensShirtPage />} />
        <Route path="/men" element={<MensShirtPage />} />
        <Route path="/menswatches" element={<MensWatchPage />} />
        <Route path="/mensshoes" element={<MensShoePage />} />
        <Route path="/tops" element={<TopsPage />} />
        <Route path="/women" element={<TopsPage />} />

        <Route path="/womensshoes" element={<WomensShoePage />} />
        <Route path="/womensbags" element={<WomensBagsPage />} />
        <Route path="/fragrances" element={<FragrancesPage />} />
        <Route path="/beauty" element={<FragrancesPage />} />

        <Route path="/skincare" element={<SkincarePage />} />
        <Route path="/furniture" element={<FurniturePage />} />
        <Route path="/groceries" element={<GroceriesPage />} />
        <Route path="/grocery" element={<GroceriesPage />} />
        <Route path="/books" element={<GroceriesPage />} />
        <Route path="/success" element={<Success />} />

        <Route path="/checkout" element={
          <PrivateRoute> 
            <Checkout /> 
          </PrivateRoute>
          
          } />
          
        <Route path="/cart" element={
          <PrivateRoute> 
            <CartDialog /> 
          </PrivateRoute>
          
          } />
          

        <Route path="/orders" element={
          <PrivateRoute > 
            <Orders />
         </PrivateRoute>
        
          
          } />




        <Route path="/product/:id" element={
          <PrivateRoute>
         <ProductSinglePage />

          </PrivateRoute>
          
          } /> 
            

            <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />


        <Route
          path="/groceries/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/laptops/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/furniture/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/mensshirts/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/menshoes/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/menwatches/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/tops/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/womenshoes/:id"
          element={
            <PrivateRoute>
             <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/womensbags/:id"
          element={
            <PrivateRoute>
             <ProductSinglePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/fragrances/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
  <Route
          path="/skincare/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />

      <Route
          path="/wishlistDialog"
          element={
            <PrivateRoute>
              <WishlistDialog />
            </PrivateRoute>
          }
        />



        <Route
          path="/mobiles/:id"
          element={
            <PrivateRoute>
              <ProductSinglePage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
