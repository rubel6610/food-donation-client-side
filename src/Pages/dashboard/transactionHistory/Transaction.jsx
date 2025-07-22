import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingPage from "../../../components/LoadingPage";

const Transaction = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Transaction History
      </h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Request Date</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center text-gray-500">
                No transactions found.
              </td>
            </tr>
          ) : (
            payments.map((payment, idx) => (
              <tr key={payment.transactionId || idx}>
                <td>{idx + 1}</td>
                <td>
                  {payment.paidAt.split("T")[0]}
                </td>
                <td className="font-mono">{payment.paymentId || "N/A"}</td>
                <td>${payment.payment_amount?.toFixed(2) || "0.00"}</td>
                <td>
                  <span
                    className={`badge ${
                      payment.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {payment.status || "N/A"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Transaction;
