import { useState } from 'react';
import { Outlet } from 'react-router';
import DashboardAside from './DashboardAside';
import UseAuth from '../../hooks/UseAuth';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery, useMutation } from '@tanstack/react-query';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();


  const hidePopupMutation = useMutation({
    mutationFn: () => axiosSecure.patch(`/users/hide-charityPopup?email=${user?.email}`),
  });

  useQuery({
    queryKey: ['charityRolePopup', user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/users/role?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
    onSuccess: (data) => {
      const { role, showApprovalPopup } = data;
      if (role === 'charity' && showApprovalPopup) {
        Swal.fire({
          title: '🎉 Congratulations!',
          text: 'Your Charity role has been approved!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        hidePopupMutation.mutate();
      }
    },
    onError: (err) => {
      console.error('Popup check failed', err);
    },
  });

  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardAside isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 p-4">
  
        <button
          className="lg:hidden text-2xl mb-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>

        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
