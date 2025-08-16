import React, { useState } from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../../hooks/UseAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeForm from "../../Stripe/StripeForm";


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const FIXED_PAYMENT = 25;

const RequestCharityRole = () => {

  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [charityInfo, setCharityInfo] = useState(null);
  const onSubmit = async (data) => {
    setCharityInfo({
      ...data,
      name: user?.displayName,
      email: user?.email,
      payment_amount: FIXED_PAYMENT,
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-base-300 shadow-2xl p-10">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-8 font-serif">
        Request Charity Role
      </h2>
      {!charityInfo ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label font-semibold text-green-600">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-base-100"
            />
          </div>
          <div>
            <label className="label font-semibold text-green-600">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-base-100"
            />
          </div>
          <div>
            <label className="label font-semibold text-green-600">Organization Name</label>
            <input
              type="text"
              {...register("organization", { required: "Organization name is required" })}
              className="input input-bordered w-full bg-base-100 text-base-content"
              placeholder="Enter your organization name"
            />
            {errors.organization && (
              <span className="text-red-500 text-sm">{errors.organization.message}</span>
            )}
          </div>
          <div>
            <label className="label font-semibold text-green-600">Mission Statement</label>
            <textarea
              {...register("mission", { required: "Mission statement is required" })}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
              placeholder="Describe your organization's mission"
            />
            {errors.mission && (
              <span className="text-red-500 text-sm">{errors.mission.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between rounded-lg px-4 ">
            <span className="font-bold text-green-600 text-lg">Payment Amount</span>
            <span className="font-bold text-green-800 text-xl">${FIXED_PAYMENT}</span>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded w-full"
          >
            Continue to Payment
          </button>
        </form>
      ) : (
        <div className="mt-8">
          <Elements stripe={stripePromise}>
            <StripeForm charityInfo={charityInfo} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default RequestCharityRole;
