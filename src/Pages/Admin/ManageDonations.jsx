import React from 'react';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import Swal from 'sweetalert2';
import LoadingPage from '../../components/LoadingPage';

const ManageDonations = () => {
  const axiosSecure = UseAxiosSecure();

  const { data: donations = [], refetch, isLoading } = useQuery({
    queryKey: ['donations'],
    queryFn: async () => {
      const res = await axiosSecure.get('/donations');
      return res.data;
    }
  });

  const handleVerify = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donations/verify/${id}`, { status: 'verified' });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Verified!', 'Donation has been verified.', 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Verification failed.', 'error');
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await axiosSecure.patch(`/donations/reject/${id}`, { status: 'rejected' });
      if (res.data.modifiedCount > 0) {
        Swal.fire('Rejected!', 'Donation has been rejected.', 'success');
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Rejection failed.', 'error');
    }
  };

  if (isLoading) return <LoadingPage/>
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Manage Donations</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-base-300">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>#</th>
              <th>Donation Title</th>
              <th>Food Type</th>
              <th>Restaurant Name</th>
              <th>Email</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <td>{index + 1}</td>
                <td>{donation.title}</td>
                <td>{donation.foodType}</td>
                <td>{donation.restaurantName}</td>
                <td>{donation.restaurantEmail}</td>
                <td>{donation.quantity}</td>
                <td>
                  <span className={`badge ${donation.status === 'verified' ? 'badge-success' : donation.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                    {donation.status || 'pending'}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleVerify(donation._id)}
                    disabled={donation.status === 'verified'}
                    className="btn btn-xs btn-success"
                  >
                    Verify
                  </button>
                  <button
                    onClick={() => handleReject(donation._id)}
                    disabled={donation.status === 'rejected'}
                    className="btn btn-xs btn-error"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDonations;
