import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';

const Signup = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/signup', formData);
      alert("Signup successful! Please login.");
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Create Account</h2>
        <input 
          type="text" placeholder="Username" 
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          onChange={(e) => setFormData({...formData, username: e.target.value})} required 
        />
        <input 
          type="email" placeholder="Email" 
          className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} required 
        />
        <input 
          type="password" placeholder="Password" 
          className="w-full p-3 mb-6 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} required 
        />
        <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          Sign Up
        </button>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;