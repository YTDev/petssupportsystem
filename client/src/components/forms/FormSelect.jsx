import React from "react";
import { useField } from "formik";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const FormSelect = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const selectId = props.id || `select-${props.name}`;
  const showError = meta.touched && !!meta.error;
  const showValid = meta.touched && !meta.error;
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={selectId}
          className={`block mb-2 font-medium text-lg ${
            showError ? "text-red-500" : "text-black"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          {...field}
          {...props}
          className={`appearance-none py-3.5 px-3 rounded  w-full text-[#272727] font-medium focus:outline-none border
            ${showError ? "border-red-500 bg-red-50" : "border-gray-300"}
          `}
        >
          {props.children}
        </select>
        {showValid && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </span>
        )}
        {showError && (
          <div className="text-red-500 text-sm mt-2 flex gap-2">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <span>{meta.error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormSelect;
