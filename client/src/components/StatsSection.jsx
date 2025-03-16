import React from "react";
import StatCard from "./StatCard";
import { FaDog, FaRegClock, FaHeart, FaHome } from "react-icons/fa";

const StatsSection = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute pointer-events-none w-full h-auto bottom-0 overflow-hidden">
          <svg
            className="scale-[6]"
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 48h2880V0h-720C1442.5 52 720 0 720 0H0v48z"
              className="fill-gray-50"
            ></path>
          </svg>
        </div>
      </div>
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              icon={<FaDog className="text-3xl text-blue-950" />}
              from={0}
              to={120000}
              formatter={(value) =>
                Intl.NumberFormat("en-US").format(value.toFixed(0)) + "+"
              }
              title="Pets in Portuguese Shelters"
              description="Each year, over 120,000 dogs and cats enter shelters across Portugal, waiting for a second chance."
            />
            <StatCard
              icon={<FaRegClock className="text-3xl text-blue-950" />}
              from={0}
              to={90}
              formatter={(value) => value.toFixed(0) + " Days"}
              title="Average Shelter Stay"
              description="Most pets in Portugal spend around three months in a shelter before finding their forever home."
            />
            <StatCard
              icon={<FaHeart className="text-3xl text-blue-950" />}
              from={0}
              to={85}
              formatter={(value) => value.toFixed(0) + "%"}
              title="of Adopters Say It Changed Their Lives"
              description="Three out of four pet adopters in Portugal report feeling happier and more connected after adopting."
              className="md:col-span-2 lg:col-span-1"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default StatsSection;
