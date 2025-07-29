import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import UseAuth from "../../hooks/UseAuth";

const RequestDonationModal = ({ donation, openModal, onClose }) => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const requestData = {
        donationId: donation._id,
        foodType: donation.foodType,
        quantity: donation.quantity,
        imageUrl: donation.imageUrl,
        donationTitle: donation.title,
        restaurantName: donation.restaurantName,
        restaurantEmail: donation.restaurantEmail,
        charityName: user.displayName,
        charityEmail: user.email,
        charityImage: user.photoURL,
        requestDescription: data.requestDescription,
        pickupTime: data.pickupTime,
        status: "pending",
        requestedAt: new Date().toISOString(),
      };
      const res = await axiosSecure.post("/requests", requestData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.insertedId) {
        Swal.fire("Requested!", "Donation request submitted.", "success");
        queryClient.invalidateQueries(["requests"]); // Optional: refetch requests list
        onClose();
        reset();
      }
    },
    onError: (error) => {
      console.error(error);
      Swal.fire("Error", "Something went wrong.", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Request Donation</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Readonly Fields */}
          <input
            type="text"
            value={donation.title}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={donation.restaurantName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="text"
            value={user?.displayName}
            readOnly
            className="input input-bordered w-full"
          />
          <input
            type="email"
            value={user?.email}
            readOnly
            className="input input-bordered w-full"
          />

          {/* Request Description */}
          <textarea
            {...register("requestDescription", { required: true })}
            placeholder="Why are you requesting this donation?"
            className="textarea textarea-bordered w-full"
            rows={3}
          />

          {/* Pickup Time */}
          <input
            {...register("pickupTime", { required: true })}
            type="time"
            className="input input-bordered w-full"
          />

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline btn-sm"
              disabled={mutation.isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Requesting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestDonationModal;
