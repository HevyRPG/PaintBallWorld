import React from 'react'

const Footer = () => {
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <footer className="bg-gray-900">
      <div className="relative mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8 lg:pt-16">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <button
            className="inline-block rounded-full bg-primary p-2 text-white shadow transition hover:bg-secondary sm:p-3 lg:p-4 "
            onClick={goToTop}
          >
            <span className="sr-only">Back to top</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div className="flex flex-col ">
            <div className="flex items-center  text-primary">
              <img
                className="w-16 h-16"
                src="./logosm.png"
                alt="Logo PaintballWorld"
              />
              <p className="ml-2 text-lg">PaintballWorld</p>
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-secondary-foreground lg:text-left">
              Od graczy, dla graczy.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <a
                className="text-secondary-foreground transition hover:text-gray-700/75"
                href="/about"
              >
                About
              </a>
            </li>

            <li>
              <a
                className="text-secondary-foreground transition hover:text-gray-700/75"
                href="/contact"
              >
                Kontakt
              </a>
            </li>

            <li>
              <a
                className="text-secondary-foreground transition hover:text-gray-700/75"
                href="/calendar"
              >
                Terminarz
              </a>
            </li>

            <li>
              <a
                className="text-secondary-foreground transition hover:text-gray-700/75 "
                href="/login"
              >
                Login
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-secondary-foreground lg:text-right ">
          Copyright &copy; 2024. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
