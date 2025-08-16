import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { Link } from "react-router";
import LoadingPage from "../../components/LoadingPage";

const Favorites = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites?email=${user.email}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (donationId) => {
      return await axiosSecure.delete(
        `/favorites?email=${user.email}&donationId=${donationId}`
      );
    },
    onSuccess: () => {
      Swal.fire("Removed!", "Removed from favorites", "success");
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  if (isLoading)
    return <LoadingPage/>

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {favorites.length === 0 && (
        <p className="text-center col-span-full text-gray-500 text-lg">
          No favorites yet.
        </p>
      )}
      {favorites.map((donation) => (
        <div
          key={donation._id}
          className="card bg-base-100 shadow-md border border-gray-200"
        >
          <figure>
            <img
              src={donation.imageUrl}
              alt={donation.title}
              className="w-full h-52 object-cover"
            />
          </figure>
          <div className="card-body relative">
            <h2 className="card-title">{donation.title}</h2>
            <p>
              <strong>Restaurant:</strong> {donation.restaurantName}
            </p>
            <p>
              <strong>Location:</strong> {donation.location}
            </p>
            <p  >
              <strong>Quantity:</strong> {donation.quantity}
            </p>
            <p className="absolute top-1 right-2 text-xs">
            <span
              className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                donation.donationStatus === "available" ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {donation.donationStatus === "available"
                ? "Available"
                : donation.status === "requested"
                ? "Requested"
                : "Picked Up"}
            </span>
          </p>
            <div className="flex  gap-2 mt-4">
              <Link
                to={`/donation-details/${donation._id}`}
                className="btn btn-sm btn-outline btn-primary"
              >
                Details
              </Link>
              <button
                onClick={() => mutation.mutate(donation._id)}
                className="btn btn-sm btn-outline btn-error "
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
