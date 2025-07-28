import React from "react";
import { NavLink } from "react-router";
import { FaUser, FaPlusCircle, FaListAlt, FaHandsHelping, FaChartPie } from "react-icons/fa";

const RestaurantDashboard = ({ setIsOpen }) => {
  return (
    <div>
      {/* Restaurant Profile */}
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
          <FaUser /> Restaurant Profile
        </NavLink>
      </li>

      {/* Add Donation */}
      <li>
        <NavLink
          to="/dashboard/add-donation"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "hover:bg-green-200 text-green-700"
            }`
          }
        >
          <FaPlusCircle /> Add Donation
        </NavLink>
      </li>

      {/* My Donations */}
      <li>
        <NavLink
          to="/dashboard/my-donations"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "hover:bg-green-200 text-green-700"
            }`
          }
        >
          <FaListAlt /> My Donations
        </NavLink>
      </li>

      {/* Requested Donations */}
      <li>
        <NavLink
          to="/dashboard/requested-donations"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "hover:bg-green-200 text-green-700"
            }`
          }
        >
          <FaHandsHelping /> Requested Donations
        </NavLink>
      </li>
      <li>
  <NavLink
    to="/dashboard/donation-statistics"
    onClick={() => setIsOpen(false)}
    className={({ isActive }) =>
      `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
        isActive
          ? "bg-green-600 text-white shadow"
          : "hover:bg-green-200 text-green-700"
      }`
    }
  >
    <FaChartPie /> Donation Statistics
  </NavLink>
</li>

    </div>
  );
};

export default RestaurantDashboard;
