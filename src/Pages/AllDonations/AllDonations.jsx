import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import { FaSearch } from "react-icons/fa";

const AllDonations = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [sortOption, setSortOption] = useState(""); 

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["allVerifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  const filteredDonations = donations.filter((donation) =>
    donation.location?.toLowerCase().includes(search.toLowerCase())
  );

  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortOption === "quantity") {
      const numA = parseInt(a.quantity);
      const numB = parseInt(b.quantity);
      return numA - numB;
    } else if (sortOption === "pickupTime") {
      return a.pickupTime.localeCompare(b.pickupTime);
    } else {
      return 0; 
    }
  });

  return (
    <div className="py-12 px-6 max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-md">
    

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        {/* Search */}
        <div className="relative w-full md:w-1/3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content">
            <FaSearch />
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by location"
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:outline-none transition bg-base-100 text-base-content shadow-sm"
          />
        </div>

        {/* Sort */}
        <div className="w-full md:w-1/4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select w-full rounded border border-gray-300 focus:outline-none transition bg-base-100 text-base-content shadow-sm"
          >
            <option value="">Sort by</option>
            <option value="quantity">Quantity</option>
            <option value="pickupTime">Pickup Time</option>
          </select>
        </div>
      </div>

      {sortedDonations.length === 0 ? (
        <p className="text-center text-lg text-red-500 font-medium">
          No donations found for "{search}"
        </p>
      ) : (
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {sortedDonations.map((donation) => (
    <div
      key={donation._id}
      className="relative group rounded-2xl shadow-lg hover:shadow-xl border overflow-hidden transition duration-300"
    >
      {/* Image */}
      <figure className="h-40 w-full overflow-hidden">
        <img
          src={donation.imageUrl}
          alt={donation.title}
          className="object-cover w-full h-full transform group-hover:scale-105 transition duration-500"
        />
      </figure>

      {/* Badge */}
      <div className="absolute top-2 right-2">
        <span
          className={`badge px-2 py-1 text-xs font-medium rounded-full shadow-sm ${
            donation.donationStatus === "Picked Up"
              ? "bg-green-500"
              : donation.donationStatus === "requested"
              ? "bg-yellow-500"
              : "bg-blue-500"
          }`}
        >
          {donation.donationStatus}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col justify-between h-44">
        <div>
          <h3 className="text-base font-bold mb-1 line-clamp-1">
            {donation.title}
          </h3>
          <p className="text-xs line-clamp-1">
            <strong>Restaurant:</strong> {donation.restaurantName}
          </p>
          <p className="text-xs line-clamp-1">
            <strong>Location:</strong> {donation.location}
          </p>
          <p className="text-xs line-clamp-1">
            <strong>Charity:</strong> {donation.requestedCharityName || "Not Assigned"}
          </p>
          <p className="text-xs">
            <strong>Quantity:</strong> {donation.quantity}
          </p>
        </div>

        <Link to={`/donation-details/${donation._id}`}>
          <button className="btn btn-xs bg-green-600 hover:bg-green-700 text-white w-full mt-2 rounded-lg shadow-sm transition duration-300">
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

export default AllDonations;
