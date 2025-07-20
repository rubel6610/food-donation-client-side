import React from 'react';

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-yellow-100">
      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-green-500 mb-8"></div>
      <h2 className="text-2xl font-bold text-green-700 font-serif mb-2 drop-shadow-lg">Loading...</h2>
      <p className="text-gray-600 text-lg">Please wait while we prepare your dashboard.</p>
    </div>
  );
};

export default LoadingPage;