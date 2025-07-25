import React from 'react';
import { Outlet } from 'react-router';
import login from '../../assets/Lottie/Login.json';
import Lottie from 'lottie-react';
const AuthLayout = () => {
    return (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen text-black">
      <div className="w-full md:w-1/3 p-6">
        <Lottie animationData={login} loop={true} />
      </div>
    
     <Outlet />
        </div>
    );
};

export default AuthLayout;