import React, { useEffect } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/UseAxiosSecure';
import { TbShoppingBagPlus } from 'react-icons/tb';
import { MdEmail, MdFastfood, MdLocationOn } from 'react-icons/md';
import { FaRegClock, FaUserAlt } from 'react-icons/fa';
import { IoIosImages } from 'react-icons/io';

const UpdateDonation = () => {

  const { id } = useParams(); // donation ID from URL
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
const data = useLoaderData();
console.log(data);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
 
  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(`/donations/${id}`, data);

      if (res.data.modifiedCount > 0) {
        Swal.fire('Updated!', 'Donation updated successfully.', 'success');
        navigate('/dashboard/my-donations');
      } else {
        Swal.fire('No Change!', 'No updates were made.', 'info');
      }
    } catch (error) {
      console.error('Update error:', error);
      Swal.fire('Error!', 'Failed to update donation.', 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-green-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center text-green-800 mb-6 flex items-center justify-center gap-2">
        <TbShoppingBagPlus className="text-3xl" /> Add a Donation
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Donation Title */}
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

        {/* Food Type */}
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
            <p className="text-red-600 text-sm mt-1">
              {errors.foodType.message}
            </p>
          )}
        </div>

        {/* Quantity */}
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
            <p className="text-red-600 text-sm mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* Pickup Time */}
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
            <p className="text-red-600 text-sm mt-1">
              {errors.pickupTime.message}
            </p>
          )}
        </div>

        {/* Restaurant Name */}
        <div>
          <div className="flex items-center gap-3">
            <FaUserAlt className="text-xl text-green-700" />
            <input
              {...register("restaurantName")}
              type="text"
              defaultValue="{displayName}"
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>
        </div>

        {/* Restaurant Email */}
        <div>
          <div className="flex items-center gap-3">
            <MdEmail className="text-xl text-green-700" />
            <input
              {...register("restaurantEmail")}
              type="email"
              defaultValue="{user?.email}"
              readOnly
              className="input input-bordered w-full bg-gray-100 text-black"
            />
          </div>
        </div>

        {/* Location */}
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
            <p className="text-red-600 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <div className="flex items-center gap-3">
            <IoIosImages className="text-xl text-green-700" />
            <input
              {...register("image", {
                required: "Image is required",
              })}
              type="file"
              accept="image/*"
              className="file-input file-input-bordered w-full bg-white text-black"
            />
          </div>
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Submit Donation
        </button>
      </form>
    </div>
  );
};

export default UpdateDonation;
