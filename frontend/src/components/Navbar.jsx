import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IoClose, IoMenuSharp } from "react-icons/io5";

import avatarImg from "../assets/commentor.png";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const navLists = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy policy", path: "/privacy-policy" },
  { name: "Contact us", path: "/contact-us" },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Auto-close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const getNavLinkClass = ({ isActive }) =>
    isActive ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <header className="bg-white py-6 border shadow-sm">
      <nav className="container mx-auto flex justify-between px-5">
        <Link to="/" aria-label="Go to homepage">
          <img src="/logo.png" alt="Site Logo" className="h-12" />
        </Link>

        {/* Desktop Menu */}
        <ul className="sm:flex hidden items-center gap-8">
          {navLists.map((list, index) => (
            <li key={index}>
              <NavLink to={list.path} className={getNavLinkClass}>
                {list.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <li className="flex items-center gap-3">
              <img src={avatarImg} alt="User avatar" className="size-8" />
              {user.role === "admin" ? (
                <>
                  <Link to="/dashboard">
                    <button className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm">
                      Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-1.5 text-white rounded-sm ml-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-[#1E73BE] px-4 py-1.5 text-white rounded-sm"
                >
                  Logout
                </button>
              )}
            </li>
          ) : (
            <li>
              <NavLink to="/login" className={getNavLinkClass}>
                Login
              </NavLink>
            </li>
          )}
        </ul>

        {/* Mobile Toggle */}
        <div className="flex items-center sm:hidden">
          <button
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            className="flex items-center px-3 py-4 bg-[#fafafa] rounded text-sm text-gray-500 hover:text-gray-900"
          >
            {isMenuOpen ? (
              <IoClose className="size-6" />
            ) : (
              <IoMenuSharp className="size-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="fixed top-[108px] left-0 w-full bg-white border-b shadow-md pb-8 z-50 transition-all duration-300">
          {navLists.map((list, index) => (
            <li className="mt-5 px-4" key={index}>
              <NavLink
                to={list.path}
                onClick={() => setIsMenuOpen(false)}
                className={getNavLinkClass}
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          <li className="px-4 mt-5 space-y-2">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full py-2 text-blue-600 hover:underline"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full py-2 text-left text-red-600 hover:underline"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-2 text-left text-gray-700 hover:underline"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </header>
  );
};

export default Navbar;
