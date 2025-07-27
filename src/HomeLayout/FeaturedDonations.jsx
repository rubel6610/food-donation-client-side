import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import LoadingPage from "../components/LoadingPage";

const FeaturedDonations = () => {
  const axiosSecure = useAxiosSecure();

  const { data: featuredDonations = [], isLoading } = useQuery({
    queryKey: ["featuredDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/featured");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage/>;

  return (
    <div className="py-10 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
        🌟 Featured Donations
      </h2>

      {featuredDonations.length === 0 ? (
        <p className="text-center text-gray-500">No featured donations yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDonations.slice(0, 4).map((donation) => (
            <div
              key={donation._id}
              className="card bg-base-100 shadow-lg border border-base-300"
            >
              <figure className="overflow-hidden h-40">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="object-cover w-full h-full"
                />
              </figure>

              <div className="card-body">
                <h3 className="text-lg font-semibold">{donation.title}</h3>
                <p>
                  <strong>Type:</strong> {donation.foodType}
                </p>
                <p>
                  <strong>Restaurant:</strong> {donation.restaurantName}
                </p>
                <p>
                  <strong>Location:</strong> {donation.location}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge text-white ${
                      donation.donationStatus === "Picked Up"
                        ? "badge-success"
                        : donation.donationStatus === "Requested"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {donation.donationStatus}
                  </span>
                </p>

                <Link to={`/donation-details/${donation._id}`}>
                  <button className="btn btn-sm btn-outline btn-primary w-full mt-3">
                    Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedDonations;
