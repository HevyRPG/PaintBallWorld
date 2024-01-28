// src/components/LoginPage.js
import React, { useState } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your login logic here
    console.log('Logging in with:', { username, password });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-6 text-center top-0 center">
        <img src={logo} alt="Logo" className="w-80 h-80" />
      </div>
      <div className="bg-bgs p-8 rounded shadow-md w-96 mt-4">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Login</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-white mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border rounded"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-[#96DA2B] text-white p-2 rounded hover:bg-primary"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-300 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#96DA2B] hover:underline hover:text-primary">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
