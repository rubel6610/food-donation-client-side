import React from "react";
import { useQuery } from "@tanstack/react-query";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import useAxiosSecure from "../../hooks/UseAxiosSecure";
import LoadingPage from "../../components/LoadingPage";
import UseAuth from "../../hooks/UseAuth";


const COLORS = ["#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#FF6666", "#82ca9d"];

const DonationStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=UseAuth();

  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["restaurantDonations"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/restaurant?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingPage />;

 
  const typeCount = {};
  donations.forEach((donation) => {
    const type = donation.foodType;
    if (typeCount[type]) {
      typeCount[type]++;
    } else {
      typeCount[type] = 1;
    }
  });

  const pieData = Object.keys(typeCount).map((type) => ({
    name: type,
    value: typeCount[type],
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-6">
        🍽️ Donation Statistics (By Food Type)
      </h2>

      <div className="w-full h-96 bg-white rounded-lg shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonationStatistics;
