import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import LoadingPage from "../../components/LoadingPage";

const ManageRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ["allRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  const handleDelete = async (id,donationId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This request will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/requests/${id}/${donationId}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "The request has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to delete the request.", "error");
      }
    }
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Manage Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full text-sm">
            <thead className="bg-base-200 text-base-content">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.requestDescription}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(req._id,req.donationId)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRequests;
