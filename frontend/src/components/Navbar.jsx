import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm py-4 px-8 flex justify-between items-center border-b">
      <h1 className="text-xl font-bold text-blue-600 uppercase tracking-tight">ExpenseFlow</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-600 italic">Welcome, {user?.username}</span>
        <button 
          onClick={handleLogout}
          className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;