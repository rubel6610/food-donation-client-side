import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";
import { format } from "date-fns";

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this review?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/my-reviews/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your review has been deleted.", "success");
          refetch(); // ✅ properly called
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Not Deleted!", "There was an error deleting this review.", "error");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg bg-white shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">{review.donationTitle}</h2>
                <span className="text-yellow-500 font-medium">{review.rating} ★</span>
              </div>

              <p className="text-sm text-gray-500 mb-1">
                Reviewer: {review.reviewerName}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                Restaurant: {review.restaurantName}
              </p>
              <p className="text-gray-700 mb-2">{review.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                Reviewed on: {format(new Date(review.reviewedAt), "dd MMM yyyy")}
              </p>

              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
