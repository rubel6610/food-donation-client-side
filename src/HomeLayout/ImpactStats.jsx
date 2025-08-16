import React, { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Impact statistics data
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
  }
];

// ✅ Fixed Counter component using useRef
const Counter = ({ value }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);

  useEffect(() => {
    const end = parseInt(value);
    if (countRef.current === end) return;

    const duration = 2000; // total animation duration in ms
    const incrementTime = 30; // update interval in ms
    const steps = Math.floor(duration / incrementTime);
    const increment = Math.ceil(end / steps);

    const counter = setInterval(() => {
      countRef.current += increment;

      if (countRef.current >= end) {
        countRef.current = end;
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(countRef.current);
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

// ✅ Main ImpactStats component
const ImpactStats = () => {
  useEffect(() => {
    AOS.init({ duration: 3000 });
     AOS.refresh();
  }, []);

  return (
    <div className="bg-base-300 py-14 px-4 my-10 rounded-xl">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10" data-aos="zoom-in-up">
          🌱 Our Community Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="p-6 bg-base-100 shadow-xl rounded-lg border border-gray-200 hover:scale-105 transition-all duration-300"
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
