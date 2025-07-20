// StripeForm.jsx
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useState } from 'react';

const StripeForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setError(error.message);
      setSuccess(null);
    } else {
      setError(null);
      setSuccess(paymentMethod.id);
      // TODO: Send paymentMethod.id to your backend
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <CardElement className="border p-4 rounded" />
      <button
        type="submit"
        disabled={!stripe}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Pay Now
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Payment successful! ID: {success}</p>}
    </form>
  );
};

export default StripeForm;
