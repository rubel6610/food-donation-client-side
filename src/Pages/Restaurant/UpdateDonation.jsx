import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import {
  MdEditNote,
  MdEmail,
  MdFastfood,
  MdLocationOn,
} from "react-icons/md";
import { FaRegClock, FaUserAlt } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";

const UpdateDonation = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: donation,
    isLoading,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure(`/donation/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (donation) {
      reset(donation);
    }
  }, [donation, reset]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      let imageUrl = donation.imageUrl;

      if (data.image && data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const imageRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
          formData
        );
        imageUrl = imageRes.data.data.display_url;
      }

      const updatedData = {
        imageUrl,
        title: data.title,
        foodType: data.foodType,
        location: data.location,
        quantity: data.quantity,
        pickupTime: data.pickupTime,
      };

      return axiosSecure.patch(`/donations/${id}`, updatedData);
    },
    onSuccess: (res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", "Donation updated successfully.", "success");
        reset();
        navigate("/dashboard/my-donations");
      } else {
        Swal.fire("No Change!", "No updates were made.", "info");
      }
    },
    onError: () => {
      Swal.fire("Error!", "Failed to update donation.", "error");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div className="text-center text-lg text-green-600">Loading donation data...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-base-200 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-600 mb-6 flex items-center justify-center gap-2">
        <MdEditNote className="text-3xl" /> Update Your Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Title */}
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-600" />
            <input
              {...register("title", { required: "Donation title is required" })}
              type="text"
              placeholder="Donation Title (e.g., Surplus Pastries)"
              className="input input-bordered w-full "
            />
          </div>
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Food Type */}
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-600" />
            <input
              {...register("foodType", { required: "Food type is required" })}
              type="text"
              placeholder="Food Type (e.g., Bakery, Produce)"
              className="input input-bordered w-full "
            />
          </div>
          {errors.foodType && <p className="text-red-600 text-sm mt-1">{errors.foodType.message}</p>}
        </div>

        {/* Quantity */}
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-600" />
            <input
              {...register("quantity", { required: "Quantity is required" })}
              type="text"
              placeholder="Quantity (e.g., 5 kg, 20 portions)"
              className="input input-bordered w-full "
            />
          </div>
          {errors.quantity && <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>}
        </div>

        {/* Pickup Time */}
        <div>
          <div className="flex items-center gap-3">
            <FaRegClock className="text-xl text-green-600" />
            <input
              {...register("pickupTime", { required: "Pickup time window is required" })}
              type="text"
              placeholder="Pickup Time Window (e.g., 2PM - 4PM)"
              className="input input-bordered w-full "
            />
          </div>
          {errors.pickupTime && <p className="text-red-600 text-sm mt-1">{errors.pickupTime.message}</p>}
        </div>

        {/* Restaurant Name */}
        <div>
          <div className="flex items-center gap-3">
            <FaUserAlt className="text-xl text-green-600" />
            <input
              {...register("restaurantName")}
              type="text"
              className="input input-bordered w-full "
              readOnly
            />
          </div>
        </div>

        {/* Restaurant Email */}
        <div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-xl text-green-600" />
            <input
              {...register("restaurantEmail")}
              type="email"
              readOnly
              className="input input-bordered w-full "
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <div className="flex items-center gap-3">
            <MdLocationOn className="text-xl text-green-600" />
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Location (e.g., 123 Street, City)"
              className="input input-bordered w-full "
            />
          </div>
          {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <div className="flex items-center gap-3">
            <IoIosImages className="text-xl text-green-600" />
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full "
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Updating..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
