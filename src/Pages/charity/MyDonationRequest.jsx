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
        console.error(err);
        Swal.fire("Error", "Something went wrong!", "error");
      }
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading your requests...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Donation Requests</h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">You have not made any requests yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="flex flex-col md:flex-row bg-base-300 p-2 rounded-xl shadow border overflow-hidden"
            >
              {/* Image */}
              {req.imageUrl && (
                <div className="md:w-40 w-full h-40 md:h-auto">
                  <img
                    src={req.imageUrl}
                    alt="Food"
                    className="object-cover rounded w-full h-full"
                  />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 p-4">
                <h3 className="text-xl font-semibold  mb-1">
                  {req.donationTitle}
                </h3>
                <p className="text-sm ">Restaurant: {req.restaurantName}</p>
                <p className="text-sm ">Food Type: {req.foodType}</p>
                <p className="text-sm">Quantity: {req.quantity}</p>
                <p className="text-sm mt-2">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      req.status === "pending"
                        ? "text-yellow-600"
                        : req.status === "accepted"
                        ? "text-green-600"

                        : req.status === "Picked Up" ? "text-accent":"text-red-600"
                    }`}
                  >
                    {req.status}
                  </span>
                </p>

                {req.status === "pending" && (
                  <button
                    onClick={() => handleCancel(req._id)}
                    className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    Cancel Request
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequest;
