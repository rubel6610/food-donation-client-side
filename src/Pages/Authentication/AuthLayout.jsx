import React from 'react';
import { Outlet } from 'react-router';
import loginBg from '../../assets/Lottie/food.json';
import Lottie from 'lottie-react';
const AuthLayout = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen text-black">
      <div className="w-full md:w-1/3 p-6">
        <Lottie animationData={loginBg} loop={true} />
      </div>
    
     <Outlet />
        </div>
    );
};

export default AuthLayout;