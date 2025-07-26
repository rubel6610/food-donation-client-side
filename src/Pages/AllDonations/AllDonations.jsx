import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import LoadingPage from "../../components/LoadingPage";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allVerifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="relative w-80 card bg-base-100 shadow-md border border-base-300 rounded-md"
        >
          <figure className="h-40 overflow-hidden rounded-t-md">
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="w-full h-full object-cover"
            />
          </figure>

          <div className="card-body p-4 space-y-1">
            <h2 className="text-lg font-semibold truncate">{donation.title}</h2>
            <p className="text-sm text-gray-600 truncate">
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p className="text-sm text-gray-600 truncate">
              <strong>Location:</strong> {donation.location}
            </p>
            <p className="text-sm text-gray-600 truncate">
              <strong>Charity:</strong> {donation.charityName || "Not Assigned"}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Quantity:</strong> {donation.quantity}
            </p>

            {/* Donation Status Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`badge px-2 py-1 text-xs font-medium ${
                  donation.donationStatus === "Picked Up"
                    ? "badge-success"
                    : donation.donationStatus === "requested"
                    ? "badge-warning"
                    : "badge-accent"
                }`}
              >
                {donation.donationStatus}
              </span>
            </div>

            {/* Details Button */}
            <div className="pt-3">
              <Link to={`/donation-details/${donation._id}`}>
                <button className="btn btn-sm btn-outline btn-primary w-full">
                  Details
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDonations;
