import React from "react";
import { FaUser, FaUserShield } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router";

const AdminDashboard = ({ setIsOpen }) => {
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
          to="/dashboard/users"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "hover:bg-green-200 text-green-700"
            }`
          }
        >
          <FaCircleUser /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/charity-role-requests"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "hover:bg-green-200 text-green-700"
            }`
          }
        >
          <FaUserShield /> Charity Role Requests
        </NavLink>
      </li>
    </div>
  );
};

export default AdminDashboard;
