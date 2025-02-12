import React from "react";
import { useField } from "formik";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";

const FormInput = ({
  label,
  minimal = false,
  showValidation = false,
  ...props
}) => {
  // connect the input to Formik state
  const [field, meta] = useField(props);
  const inputId = props.id || `input-${props.name}`;

  //when minnimal is true, => show feedback when the parent indicates (showValidation),
  // otherwise, use the normal touched status
  const shouldValidate = minimal ? showValidation : meta.touched;

  // show error if validation should run and there's an error
  const showError = shouldValidate && !!meta.error;

  // show valid checkmark only in non-minimal mode
  const showValid = !minimal && meta.touched && !meta.error;

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={inputId}
          className={`block mb-2 font-medium text-lg ${
            showError ? "text-red-500" : "text-black"
          }`}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={inputId}
          {...field}
          {...props}
          className={`appearance-none border py-3.5 px-3 rounded w-full text-[#272727]
            placeholder:text-gray-400 placeholder:font-light font-medium focus:outline-none 
            ${
              showError
                ? "border-red-500 bg-red-50 text-red-500 placeholder:text-red-500"
                : "border-gray-300"
            }
          `}
        />
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

export default FormInput;
