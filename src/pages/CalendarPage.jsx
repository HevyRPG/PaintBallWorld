import React from 'react'
import MapForCallendar from '../components/MapForCallendar'

const AboutPage = () => {
  return (
    <div>
      <div className="container mx-auto mt-8 max-w-screen-xl">
        <h1 className="text-4xl text-white font-bold mb-4">Terminarz</h1>
        <p className="text-lg text-white">
          W terminarzu można łatwo znaleźć najbliższe pola i rozgrywki w danej
          okolicy
        </p>
        {/* Add more content as needed */}
      </div>
      <MapForCallendar />
    </div>
  )
}

export default AboutPage
