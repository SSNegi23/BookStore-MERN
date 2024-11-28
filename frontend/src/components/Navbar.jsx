import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-sky-600 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">
          <Link to="/">BOOKSTORE</Link>
        </h1>

        {/* Menu */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-6 font-bold text-black">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>Bookmark</Link>
            </li>
            <li>
              <Link to={"/"}>Contact</Link>
            </li>
          </ul>
        </div>

        {/* Desktop Menu */}
        {isAuthenticated ? (
          <>
            <div className="hidden md:flex space-x-6">
              <Link
                onClick={logout}
                className="text-white text-lg font-medium hover:underline"
              >
                Logout
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="hidden md:flex space-x-6">
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-white text-lg font-medium hover:underline"
              >
                Signup
              </Link>
            </div>
          </>
        )}

        {/* Burger Menu for Mobile */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-sky-500">
          <ul className="space-y-2 text-center py-4">
            <li>
              <Link
                to={"/"}
                className="block text-white text-lg font-medium hover:underline"
                onClick={toggleMenu}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="block text-white text-lg font-medium hover:underline"
                onClick={toggleMenu}
              >
                Bookmark
              </Link>
            </li>
            <li>
              <Link
                to={"/"}
                className="block text-white text-lg font-medium hover:underline"
                onClick={toggleMenu}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link
                    to="/"
                    className="block text-white text-lg font-medium hover:underline"
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="block text-white text-lg font-medium hover:underline"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/signup"
                    className="block text-white text-lg font-medium hover:underline"
                    onClick={toggleMenu}
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
