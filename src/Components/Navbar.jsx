import { Link, NavLink } from "react-router";

import { FaBars, FaUserCircle } from "react-icons/fa";
import UseAuth from "../hooks/UseAuth";

const Navbar = () => {
  const { user, logout } = UseAuth();
  const navItems = (
    <>
      <li><NavLink to="/" className="font-semibold">Home</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/donations" className="font-semibold">All Donations</NavLink></li>
          <li><NavLink to="/dashboard/home" className="font-semibold">Dashboard</NavLink></li>
        </>
      )}
      {!user && <li><NavLink to="/login" className="font-semibold">Login</NavLink></li>}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 z-50 px-4">
      <div className="navbar-start">
        {/* Mobile Menu Toggle (left side on small devices) */}
        <div className="dropdown dropdown-bottom lg:hidden mr-2">
          <label tabIndex={1} className="btn btn-ghost lg:hidden">
            <FaBars />
          </label>
          <ul
            tabIndex={1}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
          <span  className="hidden sm:inline">FoodSave</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navItems}</ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-40"
            >
              <li><span>{user.displayName || "User"}</span></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
