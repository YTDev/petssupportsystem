import React from "react";
import HeroButton from "./HeroButton";

const Step = ({ stepNumber, title, description, children }) => {
  return (
    <div className="step">
      <h3 className="flex items-center gap-6 mt-6 mb-0">
        <span className="flex items-center justify-center w-12 h-12 text-blue-950 text-base font-semibold bg-blue-200 rounded-full">
          {stepNumber}
        </span>
        <span className="text-xl font-semibold">{title}</span>
      </h3>

      <div className="flex items-stretch gap-6">
        <div className="flex-shrink-0 w-12 flex items-stretch">
          <span
            className="bg-blue-200 h-full mx-auto"
            style={{ width: "4px" }}
          ></span>
        </div>

        <div>
          <p className="text-base text-gray-800 font-light leading-6 m-0 pt-0">
            {description}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </div>
  );
};

export default Step;
