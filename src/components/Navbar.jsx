import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path
      ? "text-white font-bold"
      : "text-primary hover:text-white";
  };

  return (
    <nav className="flex items-center justify-between max-w-screen-2xl border-b mx-auto py-4 px-4 lg:px-8">
      <div className="flex items-center">
        <span className="text-2xl font-bold tracking-tight italic text-white">
          PaintballWorld©
        </span>
      </div>

      <div className="hidden lg:flex items-center">
        <ul className="flex items-center">
          <li className="mx-4">
            <Link
              to="/"
              className={`ml-2 text-xl flex items-center ${isActive("/")}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mx-1 inline-block align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>
              Home
            </Link>
          </li>
          <li className="mx-4">
            <Link
              to="/calendar"
              className={`ml-2 text-xl flex items-center ${isActive(
                "/calendar"
              )}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mx-1 inline-block align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>
              Terminarz
            </Link>
          </li>
          <li className="mx-4">
            <Link
              to="/about"
              className={`ml-2 text-xl flex items-center ${isActive("/about")}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7 mx-1 inline-block align-middle"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
              O nas
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <Link
          to="/login"
          className="text-xl px-4 py-2 leading-none border rounded bg-primary text-white border-primary hover:bg-secondary hover:text-white hover:border-secondary mx-1"
        >
          Zaloguj
        </Link>
        <Link
          to="/dashboard"
          className="text-xl px-4 py-2 leading-none border rounded bg-primary text-white border-primary hover:bg-secondary hover:text-white hover:border-secondary mx-1"
        >
          Profil [username]
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
