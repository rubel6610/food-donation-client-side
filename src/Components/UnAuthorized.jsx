import React from "react";
import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Unauthorized = () => {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center p-6">
      <FaBan className="text-red-500 text-6xl mb-4 animate-pulse" />
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
        Unauthorized Access
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
        You do not have permission to view this page.
      </p>
      <Link
        to="/"
        className="mt-3 px-5 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
