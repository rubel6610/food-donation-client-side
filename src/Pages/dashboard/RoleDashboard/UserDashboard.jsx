import React from 'react';
import { FaRegCommentDots, FaRibbon, FaStar, FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router';

const UserDashboard = ({setIsOpen}) => {
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
            
            </div>
    );
};

export default UserDashboard;