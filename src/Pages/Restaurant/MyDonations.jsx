import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import UseAxiosSecure from '../../hooks/UseAxiosSecure';
import UseAuth from '../../hooks/UseAuth';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import LoadingPage from '../../components/LoadingPage';

const MyDonations = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const navigate = useNavigate();


  const {
    data: donations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ['myDonations', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/restaurant?email=${user.email}`);
      return res.data;
    },
  });


  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donations/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Your donation has been removed.', 'success');
        refetch(); 
      }
    },
    onError: (error) => {
      console.error(error);
      Swal.fire('Error!', 'Failed to delete the donation.', 'error');
    },
  });


  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'This donation will be deleted permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      deleteMutation.mutate(id);
    }
  };

  
  const handleUpdate = (id) => {
    navigate(`/dashboard/update-donation/${id}`);
  };


  if (isLoading) return <LoadingPage />;


  if (donations.length === 0) {
    return (
      <div className="text-center mt-16">
        <h2 className="text-2xl font-semibold text-gray-600">
          You haven&apos;t donated anything yet.
        </h2>
      </div>
    );
  }


  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div key={donation._id} className="card bg-base-100 shadow-lg border border-base-300">
          <figure className="h-40 w-full overflow-hidden">
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="w-full h-full object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{donation.title}</h2>
            <p><strong>Food Type:</strong> {donation.foodType}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p>
              <strong>Status: </strong>
              <span className={`badge ${donation.status === 'verified'
                ? 'badge-success'
                : donation.status === 'rejected'
                  ? 'badge-error'
                  : 'badge-warning'
                }`}>
                {donation.status || 'Pending'}
              </span>
            </p>

            <div className="mt-4 flex gap-2">
              {donation.status !== 'rejected' && (
                <button
                  onClick={() => handleUpdate(donation._id)}
                  className="btn btn-sm btn-primary"
                >
                  Update
                </button>
              )}
              <button
                onClick={() => handleDelete(donation._id)}
                className="btn btn-sm btn-error"
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyDonations;
