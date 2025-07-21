import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import UseAxiosSecure from "./../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const StripeForm = ({ charityInfo }) => {
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error: cardError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (cardError) {
      setError(cardError.message);
      setProcessing(false);
      return;
    } else {
      setError(null);
    }

    const { data } = await axiosSecure.post("/create-payment-intent", {
      amount: charityInfo.payment_amount,
    });

    const clientSecret = data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        const charityData = {
          name: charityInfo.name,
          email: charityInfo.email,
          mission: charityInfo.mission,
          organization: charityInfo.organization,
          payment_amount: result.paymentIntent.amount,
          paymentId: result.paymentIntent.id,
        };

        // 5. Send data to backend
        try {
          const res = await axiosSecure.post(`/payments`, charityData);

          if (res.data.insertedId) {
            Swal.fire({
              title: "Payment Successful",
              text: "Your payment has been processed successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/dashboard/home");
          } else {
            Swal.fire({
              title: "Payment Failed",
              text: "Failed to record payment in database.",
              icon: "error",
              confirmButtonText: "Try Again",
            });
          }
        } catch (err) {
          console.error("Payment backend error:", err);

          if (err.response && err.response.status === 400) {
            Swal.fire({
              icon: "error",
              title: "Payment Exists",
              text: err.response.data.message, // "Payment already exists for this user"
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Payment Failed",
              text: "Something went wrong. Please try again.",
            });
          }
        } finally {
          setProcessing(false);
        }
      }
    }
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit}>
      <div className="mb-4 border p-4 rounded-lg bg-gray-200">
        <CardElement />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing}
        className="btn btn-primary w-full text-white font-semibold"
      >
        {processing
          ? "Processing..."
          : `Pay Now $${charityInfo?.payment_amount}`}
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default StripeForm;
