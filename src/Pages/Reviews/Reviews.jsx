import React from "react";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { format } from "date-fns";


const Reviews = () => {
    const axiosSecure = useAxiosSecure();
    const {id}=useParams();
    const {data:reviews=[],isLoading}=useQuery({
        queryKey:["reviews",id],
        queryFn:async()=>{
            const res = await axiosSecure(`/reviews/${id}`);
            return res.data;
        }
    })
    if(isLoading) return  <div className="flex justify-center items-center mt-4">
      <span className="loading loading-spinner text-secondary loading-md"></span>
      <p className="ml-2 text-blue-700">Loading...</p>
    </div>
  
return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-gray-500">You haven't submitted any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg bg-base-300 shadow">
              <div className="flex justify-between items-center mb-1">
                <h2 className="font-semibold text-lg">{review.reviewerName}</h2>
                <p className="text-yellow-500 font-medium">{review.rating} ★</p>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                Restaurant: {review.restaurantName}
              </p>
              <p className="text-base-content mb-2">{review.description}</p>
              <div className="text-sm text-gray-500">
                Reviewed on: {format(new Date(review.reviewedAt), "dd MMM yyyy")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
