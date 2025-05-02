import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Dashboard/Header';
import SubHeader from '../Dashboard/SubHeader';
import registerSchema from '../schemas/registerSchema';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    const validation = registerSchema.safeParse({ name, email, password, confirmPassword });

    if (!validation.success) {
      const formattedErrors = {};
      validation.error.errors.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
      return;
    }

    setErrors({});
    
    try {
      await axios.post(
        `https://arudhra-f02e1-default-rtdb.firebaseio.com/register.json`,
        {
          name,
          email,
          password,
          returnSecureToken: true,
        }
      );
      alert("Registered Successfully");
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      alert("Registration Failed");
      console.log(err);
    }
  };

  return (
   <>
   <Header />
   <SubHeader />

   <div className="flex items-center justify-center mb-96 bg-white overflow-hidden">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <div className="space-y-1">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-lime-600 text-white py-2 rounded-lg font-semibold shadow-md transition-all duration-300"
        >
          Register
        </button>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-lime-600 font-semibold">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
   </>
  );
};

export default RegistrationPage;
