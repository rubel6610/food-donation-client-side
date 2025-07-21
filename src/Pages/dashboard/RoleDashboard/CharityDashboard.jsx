import React from "react";
import { FaCreditCard, FaUser } from "react-icons/fa";
import { NavLink } from "react-router";

const CharityDashboard = ({ setIsOpen }) => {
  return (
    <div>
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
    </div>
  );
};

export default CharityDashboard;
