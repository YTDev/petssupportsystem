import React from "react";
import { useField } from "formik";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const FormCheckbox = ({ label, ...props }) => {
  // For checkboxes, we pass type: 'checkbox' to useField.
  const [field, meta] = useField({ ...props, type: "checkbox" });
  const checkboxId = props.id || `checkbox-${props.name}`;
  const showError = meta.touched && !!meta.error;

  return (
    <div className="">
      <div className="mb-4 flex items-center ">
        <input
          type="checkbox"
          id={checkboxId}
          {...field}
          {...props}
          className="mr-2 h-4 w-4"
        />
        <label
          htmlFor={checkboxId}
          className={`text-md font-light ${
            showError ? "text-red-500" : "text-black"
          }`}
        >
          {label}
        </label>
      </div>
      {showError && (
        <div className="text-red-500 text-sm mt-1 flex gap-2 mx-auto  ">
          <ExclamationTriangleIcon className="h-4 w-4" />
          <span>{meta.error}</span>
        </div>
      )}
    </div>
  );
};

export default FormCheckbox;
