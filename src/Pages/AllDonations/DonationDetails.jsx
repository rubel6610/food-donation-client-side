import React, { useState } from "react";
import { useParams } from "react-router";
import { FaHeart, FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import UseRole from "../../hooks/UseRole";
import RequestDonationModal from "../charity/RequestDonationModal";
import AddReviewModal from "../Reviews/AddReviewModal";
import Reviews from "../Reviews/Reviews";

const DonationDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { role } = UseRole();
  const [openModal, setOpenModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const { data: donation = {} } = useQuery({
    queryKey: ["donationDetails"],
    queryFn: async () => {
      const res = await axiosSecure(`/donation/${id}`);
      return res.data;
    },
  });
  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
      <div className="card card-compact lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:w-12/15">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="h-full w-full object-contain"
          />
        </figure>

        <div className="card-body lg:w-1/2 space-y-2">
          <h2 className="card-title text-2xl font-bold">{donation.title}</h2>
          <p className="text-gray-600">
            <strong>Food Type:</strong> {donation.foodType}
          </p>
          <p>
            <strong>Quantity:</strong> {donation.quantity}
          </p>
          <p>
            <strong>Pickup Time:</strong> {donation.pickupTime}
          </p>
          <p>
            <strong>Location:</strong> {donation.location}
          </p>
          <p>
            <strong>Restaurant:</strong> {donation.restaurantName}
          </p>
          <p>
            <strong>Email:</strong> {donation.restaurantEmail}
          </p>
          <p>
            <strong>Status:</strong>
            <span
              className={`ml-2 px-2 py-1 rounded text-white text-sm ${
                donation.status === "verified" ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              {donation.status}
            </span>
          </p>

          {/* Action Buttons */}
          <div className="pt-4 space-y-2">
            <button className="btn btn-outline btn-error w-full">
              <FaHeart className="mr-2" /> Save to Favorites
            </button>
            {role === "charity" && (
              <>
                <button
                  onClick={() => setOpenModal(true)}
                  className="btn btn-primary w-full"
                >
                  Request Donation
                </button>

                <RequestDonationModal
                  openModal={openModal}
                  onClose={() => setOpenModal(false)}
                  donation={donation}
                />
              </>
            )}

            <button
              className={`btn btn-success w-full  ${
                donation.status !== "accepted" && role !== "charity" && "hidden"
              }`}
            >
              <span className="mr-2 flex items-center gap-2">
                {donation.status === "accepted" ? (
                  <>
                    <FaCheckCircle size={16} /> Picked Up{" "}
                  </>
                ) : (
                  <FaRegCheckCircle size={16} />
                )}
                Confirm Pickup
              </span>
            </button>
            {role !== "admin" && role !== "restaurant" && (
              <>
                <button
                  onClick={() => setOpenReviewModal(true)}
                  className="btn btn-outline btn-info w-full"
                >
                  <MdOutlineRateReview className="mr-2" /> Add Review
                </button>
                <AddReviewModal
                  openReviewModal={openReviewModal}
                  onClose={() => setOpenReviewModal(false)}
                  donation={donation}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/* Reviews content */}
      <Reviews />
    </div>
  );
};

export default DonationDetails;
