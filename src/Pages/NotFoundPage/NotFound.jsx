import React from 'react';
import { useNavigate } from 'react-router';
import { TbError404 } from 'react-icons/tb';

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-base-300 px-4">
      <TbError404 className="text-red-500 text-7xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-6">
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <button onClick={()=>navigate(-1)} className="btn btn-primary">
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
