import React from 'react'
import UserHome from './UserHome'
import photo from '../assets/home_logo.jpeg'
import photo_2 from '../assets/undraw_coding.png'

const data = [
  {
    name: 'Jan Nowak',
    username: 'SuperJanek',
    photo: 'https://avatar.iran.liara.run/public/22',
    feedback: 'Super strona!',
  },
  {
    name: 'Kacper Śledź',
    username: 'Kacper99PL',
    photo: 'https://avatar.iran.liara.run/public/19',
    feedback: 'Świetni ludzie!',
  },
  {
    name: 'Janina Karina',
    username: 'JK24',
    photo: 'https://avatar.iran.liara.run/public/70',
    feedback: 'Wyśmienita komunikacja',
  },
]

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="container p-8 max-w-screen-2xl gradient">
        <div className="container px-9 mx-auto flex flex-wrap flex-col md:flex-row items-center ">
          <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
            <p className="uppercase tracking-loose w-full">
              Czy jesteście gotowi?
            </p>
            <h1 className="my-4 text-5xl font-bold leading-tight">
              Witaj w PaintballWorld!
            </h1>
            <p className="leading-normal text-2xl mb-8">
              Zapraszamy Cię do odkrycia naszych różnorodnych aren, które
              gwarantują niezapomniane bitwy w sercu natury.
            </p>
            <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
              Logowanie
            </button>
          </div>

          <div className="w-full md:w-3/5 py-6 text-center">
            <img
              className="ml-16 w-5/6 z-50 rounded-xl"
              src={photo}
              alt="PaintballWorld"
            />
          </div>
        </div>
        <div className="relative gradient">
          {/* SVG Wave */}
          <svg
            viewBox="0 0 1428 174"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            {/* Wave Paths */}
          </svg>
        </div>
        <section className="bg-white border-b py-8">
          <div className="container max-w-5xl mx-auto m-8">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Title
            </h2>
            <div className="w-full mb-4">
              <div className="h-1 mx-auto gradient w-64 opacity-25 my-0 py-0 rounded-t"></div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-5/6 sm:w-1/2 p-6 pt-28">
                <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3">
                  O nas
                </h3>
                <p className="text-gray-600 mb-8">
                  Jesteśmy wiodącym parkiem paintballowym w naszym regionie,
                  oferującym niezapomniane doświadczenia dla wszystkich
                  miłośników tego ekscytującego sportu.
                </p>
              </div>
              <div className="w-full sm:w-1/2 p-6 ">
                <img className="w-5/6 p-6" src={photo_2} alt="PaintballWorld" />
              </div>
            </div>
            <div className="flex flex-wrap flex-col-reverse sm:flex-row">
              <div className="w-full sm:w-1/2 p-6 ">
                <img className="w-5/6 p-6" src={photo_2} alt="PaintballWorld" />
              </div>
              <div className="w-full sm:w-1/2 p-6 mt-6">
                <div className="align-middle">
                  <h3 className="text-3xl text-gray-800 font-bold leading-none mb-3 pt-28">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <p className="text-gray-600 mb-8">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* More sections here */}
        <section className="bg-gray-100 py-8">
          <div className="container mx-auto px-2 pt-4 pb-12 text-gray-800">
            <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-gray-800">
              Opinie
            </h2>
            <div className="flex flex-wrap justify-center">
              {data.map((item, index) => (
                <UserHome key={index} data={item} />
              ))}
            </div>
          </div>
        </section>
        <svg
          className="wave-top gradient"
          viewBox="0 0 1439 147"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-1.000000, -14.000000)" fill-rule="nonzero">
              <g class="wave" fill="#f8fafc">
                <path d="M1440,84 C1383.555,64.3 1342.555,51.3 1317,45 C1259.5,30.824 1206.707,25.526 1169,22 C1129.711,18.326 1044.426,18.475 980,22 C954.25,23.409 922.25,26.742 884,32 C845.122,37.787 818.455,42.121 804,45 C776.833,50.41 728.136,61.77 713,65 C660.023,76.309 621.544,87.729 584,94 C517.525,105.104 484.525,106.438 429,108 C379.49,106.484 342.823,104.484 319,102 C278.571,97.783 231.737,88.736 205,84 C154.629,75.076 86.296,57.743 0,32 L0,0 L1440,0 L1440,84 Z"></path>
              </g>
              <g transform="translate(1.000000, 15.000000)" fill="#FFFFFF">
                <g transform="translate(719.500000, 68.500000) rotate(-180.000000) translate(-719.500000, -68.500000) ">
                  <path
                    d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                    opacity="0.100000001"
                  ></path>
                  <path
                    d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                    opacity="0.200000003"
                  ></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        <section className="container mx-auto text-center py-6  gradient">
          <h2 className="w-full my-2 text-5xl font-bold leading-tight text-center text-white">
            Title
          </h2>
          <div className="w-full mb-4">
            <div className="h-1 mx-auto bg-white w-1/6 opacity-25 my-0 py-0 rounded-t"></div>
          </div>
          <h3 className="my-4 text-3xl leading-tight">
            Main Hero Message to sell yourself!
          </h3>
          <button className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
            Logowanie
          </button>
        </section>
      </div>
    </div>
  )
}
