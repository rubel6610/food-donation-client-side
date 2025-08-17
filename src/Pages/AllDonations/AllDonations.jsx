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


  const filteredDonations = donations.filter((donation) => {
    const searchText = search.toLowerCase();
    return donation.location?.toLowerCase().includes(searchText);
  });


  const sortedDonations = [...filteredDonations].sort((a, b) => {
    if (sortOption === "quantity") {
      // extract number from "12 loaves"
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
    <div className="px-4 py-8 max-w-7xl mx-auto bg-base-100">
      <h2 className="text-2xl font-bold mb-4 text-center">🍱 All Donations</h2>


      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
     
        <div className="relative w-full  md:w-1/3">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-base-content">
            <FaSearch />
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by location"
            className="pl-10 pr-4 py-2 w-full rounded border border-gray-300 focus:outline-none  transition bg-base-100 text-base-content shadow-sm"
          />
        </div>

        {/* Sort select */}
        <div className="w-full  md:w-1/4">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="select  w-full rounded border border-gray-300 focus:outline-none  transition bg-base-100 text-base-content shadow-sm"
          >
            <option value="">Sort by</option>
            <option value="quantity">Quantity</option>
            <option value="pickupTime">Pickup Time</option>
          </select>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-6 justify-center">
        {sortedDonations.map((donation) => (
          <div
            key={donation._id}
            className="relative w-full card bg-base-100 shadow-md border border-base-300 rounded-md p-2"
          >
            <figure className="h-40 overflow-hidden rounded-t-md">
              <img
                src={donation.imageUrl}
                alt={donation.title}
                className="w-full h-full object-cover rounded-md"
              />
            </figure>

            <div className="card-body px-2 ">
              <h2 className="text-lg font-semibold truncate">
                {donation.title}
              </h2>
              <p className="text-sm  truncate">
                <strong>Restaurant:</strong> {donation.restaurantName}
              </p>
              <p className="text-sm  truncate">
                <strong>Location:</strong> {donation.location}
              </p>
              <p className="text-sm  truncate">
                <strong>Charity:</strong>{" "}
                {donation.requestedCharityName || "Not Assigned"}
              </p>
              <p className="text-sm ">
                <strong>Quantity:</strong> {donation.quantity}
              </p>
             

    
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

        {sortedDonations.length === 0 && (
          <p className="text-center col-span-full text-red-500 font-medium">
            No donations found for "{search}"
          </p>
        )}
      </div>
    </div>
  );
};

export default AllDonations;
