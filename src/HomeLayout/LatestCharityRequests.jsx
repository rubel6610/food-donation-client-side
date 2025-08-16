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
    <div className="max-w-6xl bg-base-300 text-content mx-auto px-4 py-10 my-10 rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center">Latest Charity Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.slice(0, 3).map((req) => (
          <div key={req._id} className="bg-base-100 border rounded-lg  shadow p-5 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={req.charityImage}
                alt={req.charityName}
                className="w-14 h-14 rounded-full object-cover"
              />
              <h3 className="text-xl font-semibold">{req.charityName}</h3>
            </div>

            <p className=" mb-2">
              <strong>Food Donation:</strong> {req.donationTitle}
            </p>
            <p className=" italic">"{req.requestDescription}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCharityRequests;
