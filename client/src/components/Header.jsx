import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="relative z-10 bg-slate-200 border p-4 shadow-md">
      <div className="flex justify-between items-center max-w-7xl gap-16 mx-auto">
        <span className="text-slate-700 text-lg">
          <Link to="/">
            <span className="text-3xl font-black">Harari </span>
          </Link>
          building permit and inspection authority
        </span>
        <div className="hidden sm:flex gap-6">
          <Link to="/">
            <span className="hover:underline cursor-pointer">Home</span>
          </Link>
          <Link to="/admin-page">
            <span className="hover:underline cursor-pointer">Admin</span>
          </Link>
          <ScrollLink
            className="hover:cursor-pointer"
            to="services"
            smooth={true}
            duration={2000}
          >
            <span className="hover:underline cursor-pointer">Services</span>
          </ScrollLink>
          <ScrollLink
            className="hover:cursor-pointer"
            to="about"
            smooth={true}
            duration={2000}
          >
            <span className="hover:underline cursor-pointer">About us</span>
          </ScrollLink>
        </div>
        <div className="flex items-center sm:hidden">
          {!showMenu ? (
            <button onClick={toggleMenu} className="block focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          ) : (
            <div className="flex flex-col gap-6 p-4 absolute top-[-1px] right-[-1px] bg-blue-700 text-white font-bold w-2/3 items-center shadow-2xl pb-12">
              <button
                onClick={toggleMenu}
                className="block focus:outline-none self-end"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <Link to="/">
                <span
                  className="hover:underline cursor-pointer"
                  onClick={toggleMenu}
                >
                  Home
                </span>
              </Link>
              <Link to="/admin-page">
                <span
                  className="hover:underline cursor-pointer"
                  onClick={toggleMenu}
                >
                  Admin
                </span>
              </Link>
              <ScrollLink
                className="hover:cursor-pointer"
                to="services"
                smooth={true}
                duration={2000}
                onClick={toggleMenu}
              >
                <span className="hover:underline cursor-pointer">Services</span>
              </ScrollLink>
              <ScrollLink
                className="hover:cursor-pointer"
                to="about"
                smooth={true}
                duration={2000}
                onClick={toggleMenu}
              >
                <span className="hover:underline cursor-pointer">About us</span>
              </ScrollLink>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
