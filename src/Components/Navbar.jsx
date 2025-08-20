import { Link, NavLink } from "react-router";
import { FaBars } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";
import Logo from "./Logo";
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, logout } = UseAuth();
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.querySelector("html").setAttribute("data-theme", storedTheme);
  }, []);

  
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navItems = (
    <>
      <li>
        <NavLink to="/" className="font-semibold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donations" className="font-semibold">
          All Donations
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard/profile" className="font-semibold">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
 <div className="navbar  bg-base-100 shadow-md fixed top-0 z-50  px-4">

      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown dropdown-bottom lg:hidden">
          <label tabIndex={1} className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content mt-3 z-[1]  shadow bg-base-100 rounded-box w-40 sm:w-52"
          >
            {navItems}
          </ul>
        </div>
        <Logo />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal ">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {/* Theme Toggle */}
        <div onClick={handleTheme} className="text-3xl px-2 cursor-pointer">
          {theme === "dark" ? <MdOutlineDarkMode /> : <MdDarkMode />}
        </div>

        {/* User Dropdown */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full"
              />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 shadow bg-base-200 rounded-box w-40"
            >
              <li>
                <span>{user.displayName || "User"}</span>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="menu">
            <li>
              <NavLink to="/login" className="font-semibold">
                Login
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
