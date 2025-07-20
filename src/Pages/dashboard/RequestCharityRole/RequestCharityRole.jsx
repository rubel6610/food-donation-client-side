import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import UseAuth from "../../../hooks/UseAuth";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);
const FIXED_PAYMENT = 25;import StripeForm from './../../Stripe/StripeForm';


const RequestCharityRole = () => {
  const navigate = useNavigate();
  const { user } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [charityInfo, setCharityInfo] = React.useState(null);

  const onSubmit = async (data) => {
    navigate("/dashboard/stripe-payment");
    setCharityInfo({
      name: user.displayName,
      email: user.email,
      organization: data.organization,
      mission: data.mission,
      amount: FIXED_PAYMENT,
    });
  };

  return (
    <div className="max-w-xl mx-auto  bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl shadow-2xl p-10 ">
      <h2 className="text-3xl font-bold text-green-700 text-center mb-8 font-serif">
        Request Charity Role
      </h2>

      {!charityInfo ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <label className="label font-semibold text-green-700">Your Name</label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full bg-primary-content text-black"
            />
          </div>
          <div>
            <label className="label font-semibold text-green-700">Your Email</label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full bg-primary-content text-black"
            />
          </div>
          <div>
            <label className="label font-semibold text-green-700">Organization Name</label>
            <input
              type="text"
              {...register("organization", { required: "Organization name is required" })}
              className="input input-bordered w-full bg-white text-black"
              placeholder="Enter your organization name"
            />
            {errors.organization && (
              <span className="text-red-500 text-sm">{errors.organization.message}</span>
            )}
          </div>
          <div>
            <label className="label font-semibold text-green-700">Mission Statement</label>
            <textarea
              {...register("mission", { required: "Mission statement is required" })}
              className="textarea textarea-bordered w-full bg-white text-black"
              rows={4}
              placeholder="Describe your organization's mission"
            />
            {errors.mission && (
              <span className="text-red-500 text-sm">{errors.mission.message}</span>
            )}
          </div>
          <div className="flex items-center justify-between rounded-lg px-4 ">
            <span className="font-bold text-green-700 text-lg">Payment Amount</span>
            <span className="font-bold text-green-800 text-xl">${FIXED_PAYMENT}</span>
          </div>
          <button
            type="submit"
            className="btn btn-success w-full text-lg font-bold"
          >
            Proceed to Payment
          </button>
        </form>
      ) : (
        <Elements stripe={stripePromise}>
          <StripeForm charityInfo={charityInfo} />
        </Elements>
      )}
    </div>
  );
};

export default RequestCharityRole;
