import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <span className="font-semibold text-xl">PaintballWorld</span>
          </div>
          <div>
            <ul className="flex space-x-4">
              <li>
                <a href="/terms" className="hover:text-gray-400">
                  Regulamin
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-400">
                  Polityka prywatności
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-gray-400">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
