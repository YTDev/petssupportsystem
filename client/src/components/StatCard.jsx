import React from "react";
import { Counter } from "motioncounter";

const StatCard = ({
  icon,
  from,
  to,
  formatter,
  title,
  description,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-start p-7 bg-blue-50 rounded-lg shadow-md ${className}`}
    >
      <div className="flex items-center gap-2">
        <div className="mb-2 bg-blue-200 rounded-full p-3">{icon}</div>
        <Counter
          from={from}
          to={to}
          className="text-blue-950 text-3xl font-bold"
          formatter={formatter}
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  );
};

export default StatCard;
