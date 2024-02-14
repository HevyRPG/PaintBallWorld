import React from 'react'
import Slider from 'react-slick'

// Import CSS files for React Slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PhotoCarousel = () => {
  const settings = {
    dots: true, // Show dots for navigation
    infinite: true, // Infinite loop
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
  }

  return (
    <div className="container mx-auto mt-8 mb-4 max-w-screen-2xl bg-bgs">
      <Slider {...settings}>
        <div>
          <img
            src="/public/paint1.jpg"
            alt="Photo 1"
            className="w-[200px] h-[200px]"
          />
        </div>
        <div>
          <img src="" alt="Photo 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="photo_url_3" alt="Photo 3" className="w-full h-auto" />
        </div>
        {/* Add more <div> elements for additional photos */}
      </Slider>
    </div>
  )
}

export default PhotoCarousel
