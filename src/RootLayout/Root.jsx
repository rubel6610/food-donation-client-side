import { useEffect } from 'react';
import Navbar from "./../Components/Navbar";
import { Outlet } from "react-router";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Root = () => {
useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-18 px-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
