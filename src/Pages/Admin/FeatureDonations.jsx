import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import Swal from "sweetalert2";

const FeatureDonations = () => {
  const axiosSecure = useAxiosSecure();

  // Load all verified donations
  const { data: donations = [], isLoading, refetch } = useQuery({
    queryKey: ["verifiedDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations/verified");
      return res.data;
    },
  });

  // Mutation for featuring a donation
  const featureMutation = useMutation({
    mutationFn: async (donationId) => {
      return await axiosSecure.patch(`/donations/feature/${donationId}`);
    },
    onSuccess: () => {
      Swal.fire("Featured!", "Donation added to homepage.", "success");
      refetch();
    },
    onError: () => {
      Swal.fire("Error", "Failed to feature donation.", "error");
    },
  });

  const handleFeature = (id) => {
    featureMutation.mutate(id);
  };

  if (isLoading) return <LoadingPage />;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Verified Donations</h2>
      {donations.length === 0 ? (
        <p className="text-gray-600">No verified donations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra text-sm">
            <thead className="bg-base-200 text-sm">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Title</th>
                <th>Food Type</th>
                <th>Restaurant</th>
                <th>Status</th>
                <th>Feature</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={donation._id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={donation.imageUrl}
                      alt={donation.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{donation.title}</td>
                  <td>{donation.foodType}</td>
                  <td>{donation.restaurantName}</td>
                  <td>
                    <span className="badge badge-success">Verified</span>
                  </td>
                  <td>
                    {donation.isFeatured ? (
                      <span className="text-green-500 font-semibold">Featured</span>
                    ) : (
                      <button
                        onClick={() => handleFeature(donation._id)}
                        className="btn btn-xs btn-outline btn-accent"
                        disabled={featureMutation.isPending}
                      >
                        {featureMutation.isPending ? "Updating..." : "Feature"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeatureDonations;
