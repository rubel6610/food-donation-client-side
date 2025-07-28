import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import LoadingPage from "../../components/LoadingPage";

const RequestedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["restaurantRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/restaurant?email=${user.email}`);
      return res.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, donationId, status }) => {
      const res = await axiosSecure.patch(`/requests/status/${id}`, { status });
      if (res.data.modifiedCount > 0 && status === "rejected") {
        await axiosSecure.patch(`/requests/reject-others/${donationId}`, {
          excludeId: id,
        });
      }
      return status;
    },
    onSuccess: (status) => {
      Swal.fire("Updated!", `Request ${status} successfully.`, "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update request status.", "error");
    },
  });

  const handleStatusUpdate = (id, donationId, status) => {
    updateStatusMutation.mutate({ id, donationId, status });
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Requested Donations</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests have been made yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Donation Title</th>
                <th>Food Type</th>
                <th>Charity Name</th>
                <th>Charity Email</th>
                <th>Description</th>
                <th>Pickup Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req, index) => (
                <tr key={req._id}>
                  <td>{index + 1}</td>
                  <td>{req.donationTitle}</td>
                  <td>{req.foodType || "N/A"}</td>
                  <td>{req.charityName}</td>
                  <td>{req.charityEmail}</td>
                  <td>{req.requestDescription}</td>
                  <td>{req.pickupTime}</td>
                  <td>
                    <span
                      className={`badge text-xs whitespace-nowrap ${
                        req.status === "pending"
                          ? "badge-warning"
                          : req.status === "accepted"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="space-y-1">
                    {req.status === "pending" && (
                      <>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, req.donationId, "accepted")
                          }
                          className="btn btn-xs btn-success"
                          disabled={updateStatusMutation.isLoading}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate(req._id, req.donationId, "rejected")
                          }
                          className="btn btn-xs btn-error"
                          disabled={updateStatusMutation.isLoading}
                        >
                          Reject
                        </button>
                      </>
                    )}
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

export default RequestedDonations;
