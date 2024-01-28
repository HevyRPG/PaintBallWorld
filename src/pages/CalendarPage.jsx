import React from 'react';
import Navbar from '../components/Navbar';

const CalendarPage = () => {
  return (
    <div>
      <Navbar />

      <div className="container max-w-screen-xl mx-auto mt-8">
        <h1 className="text-4xl text-white font-bold mb-4">Calendar</h1>
        <p className="text-lg text-white">
          Explore our calendar to stay updated on upcoming events and important dates.
        </p>
        {/* Add calendar component or content as needed */}
      </div>
    </div>
  );
};

export default CalendarPage;
