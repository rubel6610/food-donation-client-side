import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const stats = [
  {
    id: 1,
    label: "Total Food Donated (kg)",
    value: 12500,
    color: "text-green-600",
  },
  {
    id: 2,
    label: "Meals Saved",
    value: 30000,
    color: "text-blue-600",
  },
  {
    id: 3,
    label: "CO₂ Reduced (kg)",
    value: 8500,
    color: "text-purple-600",
  },
];

// 🔢 Counter Component
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let duration = 1000;
    let incrementTime = 30;
    let increment = Math.ceil(end / (duration / incrementTime));

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [value]);

  return (
    <span className="text-4xl md:text-5xl font-extrabold">
      {count.toLocaleString()}
    </span>
  );
};


const ImpactStats = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-base-200 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl md:text-4xl font-bold mb-10"
          data-aos="fade-up"
        >
          🌱 Our Community Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-white shadow-xl rounded-lg border border-gray-200 hover:scale-105 transition-all duration-300"
              data-aos="zoom-in"
            >
              <p className={`${stat.color}`}>
                <Counter value={stat.value} />
              </p>
              <p className="text-gray-600 mt-2 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImpactStats;
