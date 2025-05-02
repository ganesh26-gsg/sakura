import React, { useEffect, useState } from 'react';
import useAuthStore from '../store/useCartStore';
import axios from 'axios';
import Header from '../Dashboard/Header';
import Orders from '../pages/Orders';
import Logout from './Logout';

const Profile = () => {
  const authUser = useAuthStore((state) => state.user);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const logout = useAuthStore((state) => state.logout);

  const [user, setUser] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (authUser && authUser.id) {
        try {
          const res = await axios.get(
            `https://arudhra-f02e1-default-rtdb.firebaseio.com/register/${authUser.id}.json`
          );
          if (res.data) {
            setUser({ id: authUser.id, ...res.data });
          } else {
            console.error('User data not found in Firebase');
          }
        } catch (err) {
          console.error('Error fetching user:', err);
        }
      } else if (!isLoggedIn) {
        window.location.href = '/login';
      }
    };

    fetchUser();
  }, [authUser, isLoggedIn]);

 

  const handleEdit = () => {
    if (user) {
      setEditData({
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
      });
      setIsEditing(true);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `https://arudhra-f02e1-default-rtdb.firebaseio.com/register/${user.id}.json`,
        editData
      );
      setUser({ id: user.id, ...editData });
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://arudhra-f02e1-default-rtdb.firebaseio.com/register/${user.id}.json`
      );
      logout();
      window.location.href = '/login';
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  if (!user) return (
    <div className="p-6">
      <Header />
      <p>Loading...</p>
    </div>
  );

  return (
    <>
      <Header />
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        {isEditing ? (
          <div className="space-y-2">
            <input className="border p-2 w-full rounded" name="name" value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })} />
            <input className="border p-2 w-full rounded" name="email" value={editData.email}
              onChange={(e) => setEditData({ ...editData, email: e.target.value })} />
            <input className="border p-2 w-full rounded" name="password" value={editData.password}
              onChange={(e) => setEditData({ ...editData, password: e.target.value })} />
            <div className="flex space-x-2">
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleUpdate}>Save</button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-900" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between items-center">
            <p> {user.name} - {user.email}</p>
            <div className="flex space-x-2">
              <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-yellow-600" onClick={handleEdit}>Edit</button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-red-700" onClick={handleDelete}>Delete</button>
              <Logout/>
            </div>
          </div>
        )}
      </div>
      <Orders />
    </>
  );
};

export default Profile;
