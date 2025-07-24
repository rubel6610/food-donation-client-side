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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {donations.map((donation) => (
        <div
          key={donation._id}
          className="card bg-base-100 shadow-lg border border-base-300"
        >
          <figure className=" w-full  overflow-hidden">
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="w-full h-50 px-4  object-cover"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{donation.title}</h2>
            <p><strong>Restaurant:</strong> {donation.restaurantName}</p>
            <p><strong>Location:</strong> {donation.location}</p>
            <p><strong>Charity:</strong> {donation.charityName || "Not Assigned"}</p>
            <p><strong>Quantity:</strong> {donation.quantity}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={`badge ${donation.status === "Picked Up"
                ? "badge-success"
                : donation.status === "Requested"
                ? "badge-warning"
                : "badge-info"
              }`}>
                {donation.status}
              </span>
            </p>
            <div className="mt-4">
              <Link to={`/donation-details/${donation._id}`}>
                <button className="btn btn-sm btn-outline btn-primary w-full">Details</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllDonations;
