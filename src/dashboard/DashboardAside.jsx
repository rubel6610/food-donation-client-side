import React from 'react';
import { NavLink } from 'react-router';

const DashboardAside = () => {
  return (
    <aside className="min-h-screen bg-gradient-to-br from-green-100 via-green-200 to-yellow-100 shadow-xl p-6 w-full md:w-64 rounded-r-3xl flex flex-col gap-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-green-700 font-serif mb-2">Dashboard</h2>
        <p className="text-gray-500 text-sm">Welcome to your control panel</p>
      </div>
      <nav>
        <ul className="flex flex-col gap-4">
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-600 text-white shadow'
                    : 'hover:bg-green-200 text-green-700'
                }`
              }
            >
              <span role="img" aria-label="overview">🏠</span> Overview
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-600 text-white shadow'
                    : 'hover:bg-green-200 text-green-700'
                }`
              }
            >
              <span role="img" aria-label="profile">👤</span> Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'bg-green-600 text-white shadow'
                    : 'hover:bg-green-200 text-green-700'
                }`
              }
            >
              <span role="img" aria-label="settings">⚙️</span> Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        <button className="btn btn-outline btn-error w-full">Logout</button>
      </div>
    </aside>
  );
};

export default DashboardAside;