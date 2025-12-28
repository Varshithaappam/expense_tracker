import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      // Update global state and localStorage
      login(data.token, data.username);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || "Login failed. Check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mb-8">Please enter your details to login</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="name@company.com"
              onChange={(e) => setEmail(e.target.value)} required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" 
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transform active:scale-95 transition">
            Sign In
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-gray-600">
          New here? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;