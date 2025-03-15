import React from "react";

const Step = ({ stepNumber, title, description }) => {
  return (
    <div className="step">
      <h3 className="flex items-center gap-6 mt-6 mb-0">
        <span className="flex items-center justify-center w-12 h-12 text-blue-600 text-base font-semibold bg-blue-200 rounded-full">
          {stepNumber}
        </span>
        <span>{title}</span>
      </h3>

      <div className="flex items-stretch gap-6">
        <div className="flex-shrink-0 w-12 flex items-stretch">
          <span
            className="bg-blue-200 h-full mx-auto"
            style={{ width: "4px" }}
          ></span>
        </div>

        <p className="text-base font-medium leading-6 m-0 pt-0">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Step;
