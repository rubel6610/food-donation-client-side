import React, { useState } from "react";
import { useParams } from "react-router";
import { FaHeart, FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import UseRole from "../../hooks/UseRole";
import RequestDonationModal from "../charity/RequestDonationModal";
import AddReviewModal from "../Reviews/AddReviewModal";
import Reviews from "../Reviews/Reviews";
import UseAuth from "../../hooks/UseAuth";
import Swal from "sweetalert2";

const DonationDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = UseAuth();
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

  const mutation = useMutation({
    mutationFn: async (donationId) => {
      return await axiosSecure.post(`/favorites?email=${user.email}`, {
        donationId,
      });
    },
    onSuccess: () => {
      Swal.fire("Success", "Added to your favorites!", "success");
    
    },
    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });

  // confirm pickup
  const { data: pickups = [], refetch } = useQuery({
    queryKey: ["myPickups", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/requests/pickups?email=${user.email}`
      );
      return res.data;
    },
  });

  const { mutate: confirmPickup, isPending } = useMutation({
    mutationFn: async ({ requestId, donationId }) => {
      return await axiosSecure.patch(`/requests/picked-up/${requestId}`, {
        donationId,
      });
    },
    onSuccess: (data) => {
      if (data.data.modifiedCount > 0) {
        Swal.fire("Confirmed!", "Donation marked as picked up.", "success");
        refetch();
        
      }
    },
    onError: () => {
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  const handleConfirmPickup = (requestId, donationId) => {
    Swal.fire({
      title: "Confirm Pickup?",
      text: "Are you sure you have picked up this donation?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        confirmPickup({ requestId, donationId });
      }
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-10">
      <div className="card card-compact lg:card-side bg-base-100 shadow-xl">
        <figure className="lg:max-w-7/15 h-96 w-8/12 mx-auto">
          <img
            src={donation.imageUrl}
            alt={donation.title}
            className="w-full object-cover"
          />
        </figure>

        <div className="card-body lg:w-1/2  ">
          <h2 className="card-title  text-2xl font-bold">{donation.title}</h2>
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
          <p className="absolute top-10 lg:right-6 right-46">
            <span
              className={`badge px-3 py-1 text-xs font-semibold ${
                donation.donationStatus === "Pick Up"
                  ? "badge-accent"
                  : donation.donationStatus === "requested"
                  ? "badge-warning"
                  : "badge-success"
              }`}
            >
              {donation.donationStatus}
            </span>
          </p>
          <div className="pt-4 space-y-2">
            {(role === "charity" || role === "user") && (
              <button
                onClick={() => mutation.mutate(donation._id)}
                className="btn btn-outline btn-error w-full"
              >
                <FaHeart className="mr-2" /> Save to Favorites
              </button>
            )}

            {role === "charity" && (
              <>
                <button
                  onClick={() => setOpenModal(true)}
                  disabled={donation.donationStatus === "Picked Up"}
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

            {role === "charity" && (
              <>
                {pickups
                  .filter(
                    (pickup) =>
                      pickup.donationId === donation._id &&
                      pickup.status !== "Picked Up"
                  )
                  .map((pickup) => (
                    <button
                      key={pickup._id}
                      onClick={() =>
                        handleConfirmPickup(pickup._id, pickup.donationId)
                      }
                      disabled={isPending}
                      className="btn btn-success w-full"
                    >
                      {isPending ? (
                        "Updating..."
                      ) : (
                        <>
                          <FaCheckCircle className="mr-2" /> Confirm Pickup
                        </>
                      )}
                    </button>
                  ))}
              </>
            )}

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
