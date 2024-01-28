// src/components/HomePage.js
import React from 'react';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
    <Navbar />
    <div className="bg-bg container mx-auto mt-8 max-w-screen-xl">
    <h1 className="text-4xl font-bold mb-4 text-white">Welcome to Your App!</h1>
    <p className="text-lg text-white">This is the home page content. You can customize it to suit your needs.</p>
    {/* Add more content as needed */}
  </div>
  </div>
  );
};

export default HomePage;
