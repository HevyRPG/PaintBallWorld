import React from 'react'
import logosm from '../assets/logosm.png'

const HomePage = () => {
  return (
    <div className="bg-bg container mx-auto m-8 max-w-screen-xl ">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 size-1/2 bg-bgs">
          <img src={logosm} alt="Logo" className="w-full h-full" />
        </div>
        <div className="bg-bgs w-full">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Witamy na PaintballWorld!
          </h1>
          <p className="text-lg text-white">
            Stronie stworzonej od pasjonatów, dla pasjonatów.
          </p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  )
}

export default HomePage
