import { NavLink } from "react-router";
import { FaHome, FaUser, FaRibbon, FaStar, FaRegCommentDots, FaCreditCard, FaCog } from "react-icons/fa";
import UseAuth from "../../hooks/UseAuth";

const DashboardAside = ({ isOpen, setIsOpen }) => {
  const { logout } = UseAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside
      className={`fixed lg:static top-0 left-0 h-full w-64 bg-gradient-to-br from-green-100 via-green-200 to-yellow-100 shadow-xl p-6 rounded-r-3xl flex flex-col gap-8 z-50 transition-transform duration-300 ease-in-out
      ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 min-h-screen`}
    >
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end mb-2">
        <button
          onClick={() => setIsOpen(false)}
          className="text-xl font-bold text-gray-600 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-700 font-serif mb-2">
          Dashboard
        </h2>
        <p className="text-gray-500 text-sm">Welcome to your control panel</p>
      </div>

      <nav>
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              to="/dashboard/home"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaHome /> Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaUser /> My Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/request-charity-role"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaRibbon /> Be a Charity
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/favorites"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaStar /> Favorites
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/reviews"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaRegCommentDots /> My Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/transactions"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaCreditCard /> Transaction History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow"
                    : "hover:bg-green-200 text-green-700"
                }`
              }
            >
              <FaCog /> Settings
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="btn btn-outline btn-error w-full"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default DashboardAside;
