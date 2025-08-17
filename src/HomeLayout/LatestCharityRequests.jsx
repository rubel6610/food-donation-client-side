import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/UseAxiosSecure";
import LoadingPage from "../components/LoadingPage";

const LatestCharityRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ["latestCharityRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests/latest");
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

  return (
    <div className="max-w-6xl bg-base-100 mx-auto px-4 py-10 my-10 rounded-xl">
      <h2 className="text-3xl text-green-700 font-bold mb-8 text-center">
        Latest Charity Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.slice(0, 3).map((req) => (
          <div
            key={req._id}
            className="bg-base-200 border rounded-xl shadow-md p-5 flex flex-col items-center md:flex-row md:items-center gap-6"
          >
            {/* Photo */}
            <img
              src={req.charityImage}
              alt={req.charityName}
              className="w-20 h-20 rounded-full object-cover"
            />

            {/* Text */}
            <div className="text-center md:text-left flex-1">
              <h3 className="text-xl font-semibold">{req.charityName}</h3>
              <p className="mt-2">
                <strong>Food Donation:</strong> {req.donationTitle}
              </p>
              <p className="italic text-sm mt-1">"{req.requestDescription}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
