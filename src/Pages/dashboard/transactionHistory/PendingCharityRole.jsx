import React from "react";
import UseAxiosSecure from "../../../hooks/UseAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingPage from "../../../components/LoadingPage";
import Swal from "sweetalert2";

const PendingCharityRole = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data.filter((payment) => payment.status === "pending");
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ email, status }) => {
      const role = status === "approved" ? "charity" : "user";
      return await axiosSecure.patch(`/users/role?email=${email}`, {
        role,
        status,
      });
    },
    onSuccess: (data, variables) => {
      const { status } = variables;
      const role = status === "approved" ? "charity" : "user";
      if (data?.data?.modifiedCount) {
        Swal.fire({
          title: "✅ Success",
          text: `Role updated to ${role}`,
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["payments", user?.email] }); 
      } else {
        Swal.fire({
          title: "❌ Error",
          text: "Failed to update role",
          icon: "error",
        });
      }
    },
    onError: () => {
      Swal.fire({
        title: "❌ Error",
        text: "Something went wrong",
        icon: "error",
      });
    },
  });

  const handleCharityRole = (email, status) => {
    mutation.mutate({ email, status });
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Pending Charity Requests
      </h2>
      <table className="table table-zebra w-full">
        <thead className="bg-base-200">
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Organization</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center text-gray-500">
                No request found.
              </td>
            </tr>
          ) : (
            payments.map((payment, idx) => (
              <tr key={payment.transactionId || idx}>
                <td>{idx + 1}</td>
                <td>{payment.paymentDate?.split("T")[0]}</td>
                <td className="font-mono">{payment.organization || "N/A"}</td>
                <td>${payment.paymentAmount / 100 || "0.00"}</td>
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
                <td className="flex gap-2">
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => handleCharityRole(payment.email, "approved")}
                    disabled={mutation.isPending}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleCharityRole(payment.email, "rejected")}
                    disabled={mutation.isPending}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingCharityRole;
