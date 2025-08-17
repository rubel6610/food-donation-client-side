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

  if (isLoading) return <LoadingPage />;

  return (
    <div className="py-12 my-12 bg-base-300 rounded-2xl px-6 max-w-7xl mx-auto shadow-md">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-green-700 drop-shadow-md">
        🌟 Featured Donations
      </h2>

      {featuredDonations.length === 0 ? (
        <p className="text-center  text-lg">
          No featured donations yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredDonations.slice(0, 4).map((donation) => (
            <div
              key={donation._id}
              className="relative group  rounded-2xl shadow-lg hover:shadow-2xl border overflow-hidden transition duration-300"
            >
              {/* Image */}
              <figure className="h-46 w-full overflow-hidden">
                <img
                  src={donation.imageUrl}
                  alt={donation.title}
                  className="object-cover w-full h-full transform group-hover:scale-110 transition duration-500"
                />
              </figure>

              {/* Badge */}
              <div className="absolute top-3 right-3">
                <span
                  className={`badge px-3 py-1 text-xs font-medium rounded-full shadow-sm ${
                    donation.donationStatus === "Picked Up"
                      ? "bg-green-500 "
                      : donation.donationStatus === "requested"
                      ? "bg-yellow-500 "
                      : "bg-blue-500 "
                  }`}
                >
                  {donation.donationStatus}
                </span>
              </div>

              {/* Card body */}
              <div className="p-5 flex flex-col justify-between h-50">
                <div>
                  <h3 className="text-lg font-bold  mb-2 line-clamp-1">
                    {donation.title}
                  </h3>
                  <p className="text-sm">
                    <strong>Type:</strong> {donation.foodType}
                  </p>
                  <p className="text-sm ">
                    <strong>Restaurant:</strong> {donation.restaurantName}
                  </p>
                  <p className="text-sm  line-clamp-1">
                    <strong>Location:</strong> {donation.location}
                  </p>
                </div>

                <Link to={`/donation-details/${donation._id}`}>
                  <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white w-full mt-4 rounded-lg shadow-md transition duration-300">
                    View Details
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
