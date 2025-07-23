import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAuth from "../../hooks/UseAuth";
import useAxiosSecure from "../../hooks/UseAxiosSecure";

const MyDonationRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myRequests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/charity?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel this request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/requests/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
          refetch();
        }
      } catch (err) {
        console.log(err);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading your requests...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Requests</h2>
      {requests.length === 0 ? (
        <p className="text-gray-500">You have not made any requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {requests.map((req) => (
            <div key={req._id} className="border p-4 rounded-lg shadow bg-white">
              <h3 className="text-lg font-semibold mb-1">{req.donationTitle}</h3>
              <p className="text-sm text-gray-600 mb-1">Restaurant: {req.restaurantName}</p>
              <p className="text-sm text-gray-600 mb-1">Food Type: {req.foodType}</p>
              <p className="text-sm text-gray-600 mb-1">Quantity: {req.quantity}</p>
              <p className="text-sm font-medium">
                Status:{" "}
                <span
                  className={`${
                    req.status === "Pending"
                      ? "text-yellow-600"
                      : req.status === "Accepted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {req.status === "pending" && (
                <button
                  onClick={() => handleCancel(req._id)}
                  className="mt-3 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;
