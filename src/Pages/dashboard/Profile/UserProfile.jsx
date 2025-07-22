import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";
import UseAuth from "../../../hooks/UseAuth";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";

const UserProfile = () => {
  const axiosSecure = UseAxiosSecure();
  const { user, userUpdateProfile } = UseAuth();
  const [editing, setEditing] = useState(false);
  const { data: singleUser = {}, refetch } = useQuery({
    queryKey: ["user", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/singleUser?email=" + user.email);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (singleUser?.email) {
      reset({
        name: singleUser?.name || "",
        email: singleUser?.email || "",
        mobile: singleUser?.mobile || "",
      });
    }
  }, [singleUser, reset]);

  const onSubmit = async (data) => {
    let imageUrl = singleUser?.photoURL;

    // If a new image is uploaded, upload it to imgbb
    if (data.photoURL && data.photoURL.length > 0) {
      const image = data.photoURL[0];
      const formData = new FormData();
      formData.append("image", image);
      const imageRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
        formData
      );
      imageUrl = imageRes.data.data.display_url;
    }

    // Update user profile in Firebase
    await userUpdateProfile({
      displayName: data.name,
      photoURL: imageUrl,
      mobile: data.mobile,
    });

    // Update user data in the database
    const updatedUser = {
      name: data.name,
      photoURL: imageUrl,
      mobile: data.mobile,
    };

    const res = await axiosSecure.patch(
      `/users?email=${user.email}`,
      updatedUser
    );
    if (res.data.modifiedCount === 0) {
      return Swal.fire({
        title: "Error",
        text: "No changes made",
        icon: "info",
      });
    }
    // Show success message
    if (res.data.modifiedCount) {
      Swal.fire({
        title: "Success",
        text: "Profile updated successfully",
        icon: "success",
      });
      refetch();
      setEditing(false);
    } else {
      Swal.fire({
        title: "Error",
        text: "Failed to update profile",
        icon: "error",
      });
    }
    reset(data);
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-bold text-green-700 text-center mb-8 font-serif">
          My Profile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Profile Picture & Basic Info */}
          <div className="flex flex-col items-center gap-3 text-center">
            <img
              src={singleUser?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-green-500 shadow-lg object-cover"
            />
            <h3 className="text-2xl font-semibold text-green-800">
              {singleUser?.name}
            </h3>
            <p className="text-gray-600">{singleUser?.email}</p>
            <p className="text-gray-500">
              {singleUser?.mobile || "No mobile added"}
            </p>
            {singleUser.role !== "user" && (
              <p className="text-gray-600">
                <strong>Role : {singleUser.role}</strong>
              </p>
            )}

            {!editing && (
              <button
                className="btn btn-accent mt-4"
                onClick={() => setEditing(true)}
              >
                Edit Profile
              </button>
            )}
          </div>

          {/* Form Section */}
          {editing && (
            <div className="md:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="label font-semibold text-green-700">
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full text-black bg-white"
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <span className="text-red-500 text-sm">
                      {errors.name.message}
                    </span>
                  )}
                </div>
                <div>
                  <label className="label font-semibold text-green-700">
                    Email
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="input input-bordered w-full  disabled:bg-white disabled:border-none disabled:text-black"
                    disabled
                  />
                  {/* No validation for email since it's disabled */}
                </div>
                <div>
                  <label className="label font-semibold text-green-700">
                    Profile Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    {...register("photoURL")}
                    className="input input-bordered w-full text-black bg-white"
                  />
                </div>
                <div>
                  <label className="label font-semibold text-green-700">
                    Mobile
                  </label>
                  <input
                    type="tel"
                    {...register("mobile", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[0-9]{10,15}$/,
                        message: "Enter a valid mobile number",
                      },
                    })}
                    className="input input-bordered w-full text-black bg-white"
                    placeholder="Mobile Number"
                  />
                  {errors.mobile && (
                    <span className="text-red-500 text-sm">
                      {errors.mobile.message}
                    </span>
                  )}
                </div>
                <div className="col-span-1 md:col-span-2 flex justify-end gap-3 mt-4">
                  <button type="submit" className="btn btn-success">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
