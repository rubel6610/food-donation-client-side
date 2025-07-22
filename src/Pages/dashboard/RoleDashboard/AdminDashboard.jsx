import React from "react";
import { NavLink } from "react-router";
import {
  FaUser,
  FaUsers,
  FaUserShield,
  FaHandsHelping,
  FaGift,
  FaStar,
} from "react-icons/fa";

const AdminDashboard = ({ setIsOpen }) => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
      isActive
        ? "bg-green-600 text-white shadow"
        : "hover:bg-green-200 text-green-700"
    }`;

  return (
    <div className="space-y-2">
      <li>
        <NavLink to="/dashboard/profile" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaUser /> Admin Profile
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-donations" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaGift /> Manage Donations
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaUsers /> Manage Users
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/charity-role-requests" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaUserShield /> Manage Role Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/manage-requests" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaHandsHelping /> Manage Requests
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/feature-donations" onClick={() => setIsOpen(false)} className={linkClass}>
          <FaStar /> Feature Donations
        </NavLink>
      </li>
    </div>
  );
};

export default AdminDashboard;
