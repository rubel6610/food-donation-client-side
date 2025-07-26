import React, { useState } from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import LoadingPage from "../../components/LoadingPage";
import { MdOutlineRateReview } from "react-icons/md";
import AddReviewModal from "../Reviews/AddReviewModal";

const ReceivedDonations = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const [selectedDonation, setSelectedDonation] = useState(null);

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["receivedDonations", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests/received?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-xl px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Received Donations</h2>

      {donations.length === 0 ? (
        <p className="text-gray-600">No donations received yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {donations.map((donation) => (
            <div
              key={donation._id}
              className="border p-4 rounded-lg shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{donation.donationTitle}</h3>
                <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
                <p><strong>Food Type:</strong> {donation.foodType}</p>
                <p><strong>Quantity:</strong> {donation.quantity}</p>
                <p><strong>Pickup Date:</strong> {donation.pickupTime.split("T")[0]}</p>
               
              </div>

              <button
                onClick={() => setSelectedDonation(donation)}
                className="mt-4 btn btn-outline btn-info btn-sm"
              >
                <MdOutlineRateReview className="mr-2" /> Add Review
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Review Modal */}
      {selectedDonation && (
        <AddReviewModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          openReviewModal={!!selectedDonation}
        />
      )}
    </div>
  );
};

export default ReceivedDonations;
