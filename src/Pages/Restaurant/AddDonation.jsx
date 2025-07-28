import React from "react";
import { useForm } from "react-hook-form";
import { MdFastfood, MdLocationOn, MdEmail } from "react-icons/md";
import { FaRegClock, FaUserAlt } from "react-icons/fa";
import { IoIosImages } from "react-icons/io";
import { TbShoppingBagPlus } from "react-icons/tb";
import UseAuth from "../../hooks/UseAuth";
import axios from "axios";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";

const AddDonation = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();


  const mutation = useMutation({
    mutationFn: async (donations) => {
      const res = await axiosSecure.post("/donations", donations);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Donation Submitted!",
          text: "Waiting for admin approval...",
          timer: 2500,
          showConfirmButton: false,
        });
        navigate("/dashboard/my-donations");
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while submitting your donation. Please try again.",
      });
    },
  });

  const onSubmit = async (data) => {
    const { title, image, foodType, location, pickupTime, quantity } = data;

    try {
      const formData = new FormData();
      formData.append("image", image[0]);

      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );

      const imageUrl = imageRes.data.data.display_url;

      const donationData = {
        title,
        restaurantName: user.displayName,
        restaurantEmail: user.email,
        foodType,
        quantity,
        pickupTime,
        location,
        imageUrl,
        status: "pending",
        donated_At: new Date().toISOString(),
      };

      mutation.mutate(donationData);
      reset();
    } catch (err) {
      console.error("Image upload error:", err);
      Swal.fire({
        icon: "error",
        title: "Image Upload Failed",
        text: "Unable to upload image. Please try again later.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-green-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-3 flex items-center justify-center gap-2">
        <TbShoppingBagPlus className="text-3xl" /> Add a Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
     
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-700" />
            <input
              {...register("title", { required: "Donation title is required" })}
              type="text"
              placeholder="Donation Title (e.g., Surplus Pastries)"
              className="input input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

       
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-700" />
            <input
              {...register("foodType", { required: "Food type is required" })}
              type="text"
              placeholder="Food Type (e.g., Bakery, Produce)"
              className="input input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.foodType && (
            <p className="text-red-600 text-sm mt-1">{errors.foodType.message}</p>
          )}
        </div>

      
        <div>
          <div className="flex items-center gap-3">
            <MdFastfood className="text-xl text-green-700" />
            <input
              {...register("quantity", { required: "Quantity is required" })}
              type="text"
              placeholder="Quantity (e.g., 5 kg, 20 portions)"
              className="input input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.quantity && (
            <p className="text-red-600 text-sm mt-1">{errors.quantity.message}</p>
          )}
        </div>

      
        <div>
          <div className="flex items-center gap-3">
            <FaRegClock className="text-xl text-green-700" />
            <input
              {...register("pickupTime", {
                required: "Pickup time window is required",
              })}
              type="text"
              placeholder="Pickup Time Window (e.g., 2PM - 4PM)"
              className="input input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.pickupTime && (
            <p className="text-red-600 text-sm mt-1">{errors.pickupTime.message}</p>
          )}
        </div>

      
        <div>
          <div className="flex items-center gap-3">
            <FaUserAlt className="text-xl text-green-700" />
            <input
              {...register("restaurantName")}
              type="text"
              defaultValue={user.displayName}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>
        </div>

       
        <div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-xl text-green-700" />
            <input
              {...register("restaurantEmail")}
              type="email"
              defaultValue={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>
        </div>

 
        <div>
          <div className="flex items-center gap-3">
            <MdLocationOn className="text-xl text-green-700" />
            <input
              {...register("location", { required: "Location is required" })}
              type="text"
              placeholder="Location (e.g., 123 Street, City)"
              className="input input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.location && (
            <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
          )}
        </div>

 
        <div>
          <div className="flex items-center gap-3">
            <IoIosImages className="text-xl text-green-700" />
            <input
              {...register("image", { required: "Image is required" })}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

    
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {mutation.isLoading ? "Submitting..." : "Submit Donation"}
        </button>
      </form>
    </div>
  );
};

export default AddDonation;
