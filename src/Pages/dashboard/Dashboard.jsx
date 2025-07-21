import { useState } from 'react';
import DashboardAside from './DashboardAside';
import { Outlet } from 'react-router';
import Navbar from './../../Components/Navbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
    
    
    <div className="flex">
      {/* Sidebar */}
      <DashboardAside isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Hamburger for mobile */}
        <button
          className="lg:hidden text-2xl mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

      <Outlet/>

      </div>
    </div>
    </>
  );
};

export default DashboardLayout;
