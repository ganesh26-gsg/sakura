import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../store/useCartStore';
import registerSchema from '../schemas/registerSchema';
import LandingPage from '../Dashboard/LandingPage';

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get('https://arudhra-f02e1-default-rtdb.firebaseio.com/register.json');
      const data = res.data;
      const users = data ? Object.entries(data).map(([id, user]) => ({ id, ...user })) : [];

      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        const token = `token-${user.id}-${Date.now()}`;
        localStorage.setItem('authToken', token);
        login(user);
        setOpen(false);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Login failed. Please try again.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const validatedData = registerSchema.parse({ name, email, password, confirmPassword });

      const newUser = { name: validatedData.name, email: validatedData.email, password: validatedData.password };

      await axios.post('https://arudhra-f02e1-default-rtdb.firebaseio.com/register.json', newUser);
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setError('');
      setFieldErrors({});
      alert('Registration successful! Please login.');
    } catch (err) {
      if (err.errors) {
        const errors = {};
        err.errors.forEach((error) => {
          errors[error.path[0]] = error.message;
        });
        setFieldErrors(errors);
      } else {
        console.error('Registration error:', err);
        setError('Registration failed. Try again.');
      }
    }
  };

  return (
   <> <Dialog.Root open={open} onOpenChange={setOpen}>
   <Dialog.Portal>
     <Dialog.Overlay className="bg-black/50 fixed inset-0 backdrop-blur-sm z-40" />
     <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6 w-full max-w-md z-50">
       {isLogin ? (
         <>
           <Dialog.Title className="text-2xl font-bold mb-4 text-center">Login</Dialog.Title>
           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
           <form onSubmit={handleLogin} className="space-y-4">
             <input
               type="email"
               placeholder="Email"
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full px-4 py-2 border rounded"
             />
             <input
               type="password"
               placeholder="Password"
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className="w-full px-4 py-2 border rounded"
             />
             <button
               type="submit"
               className="w-full bg-pink-600 text-white py-2 rounded hover:bg-gray-700 transition"
             >
               Login
             </button>
           </form>
           <p className="text-sm mt-4 text-center">
             Didn't have an account?{' '}
             <span
               onClick={() => {
                 setIsLogin(false);
                 setError('');
                 setFieldErrors({});
               }}
               className="text-blue-600 hover:underline cursor-pointer"
             >
               Register
             </span>
           </p>
         </>
       ) : (
         <>
           <Dialog.Title className="text-2xl font-bold mb-4 text-center">Register</Dialog.Title>
           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
           <form onSubmit={handleRegister} className="space-y-4">
             <div>
               <input
                 type="text"
                 placeholder="Name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="w-full px-4 py-2 border rounded"
               />
               {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
             </div>
             <div>
               <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full px-4 py-2 border rounded"
               />
               {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
             </div>
             <div>
               <input
                 type="password"
                 placeholder="Password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full px-4 py-2 border rounded"
               />
               {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
             </div>
             <div>
               <input
                 type="password"
                 placeholder="Confirm Password"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 className="w-full px-4 py-2 border rounded"
               />
               {fieldErrors.confirmPassword && <p className="text-red-500 text-xs mt-1">{fieldErrors.confirmPassword}</p>}
             </div>
             <button
               type="submit"
               className="w-full bg-pink-600 text-white py-2 rounded hover:bg-green-700 transition"
             >
               Register
             </button>
           </form>
           <p className="text-sm mt-4 text-center">
             Already have an account?{' '}
             <span
               onClick={() => {
                 setIsLogin(true);
                 setError('');
                 setFieldErrors({});
               }}
               className="text-pink-600 hover:underline cursor-pointer"
             >
               Login
             </span>
           </p>
         </>
       )}
     </Dialog.Content>
   </Dialog.Portal>
 </Dialog.Root>
   
   <LandingPage />



   
   </>
  );
};

export default LoginPage;
