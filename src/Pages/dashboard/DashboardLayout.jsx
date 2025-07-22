import { useEffect, useState } from 'react';
import DashboardAside from './DashboardAside';
import { Outlet } from 'react-router';
import Navbar from '../../Components/Navbar';
import UseAuth from '../../hooks/UseAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {user}=UseAuth();
  const axiosSecure = UseAxiosSecure();
  
  useEffect(()=>{
    const checkPopup = async()=>{
      if(user?.email){
        try{
          const res = await axiosSecure(`/users/role?email=${user?.email}`);
          const {role,showApprovalPopup}=res.data;
          if(role === "charity" && showApprovalPopup){
             Swal.fire({
              title: "🎉 Congratulations!",
              text: "Your Charity role has been approved!",
              icon: "success",
              confirmButtonText: "OK",
            });
          }
          await axiosSecure.patch(`/users/hide-charityPopup?email=${user?.email}`
          )
        }catch (error) {
          console.error("Popup check failed", error);
        }
        
      }
    }
    checkPopup();
  },[user?.email, axiosSecure])

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
