import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useField } from "formik";

function TextInput() {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [field, meta] = useField("fullName");

  const isValid = meta.touched && !meta.error;

  /* field is touched and has an error => showError is treu*/

  const showError = meta.touched && meta.error && hasInteracted;

  return (
    <div>
      <label
        htmlFor="fullName"
        className="block mb-2 text-[#272727] font-bold text-lg"
      >
        Full Name
      </label>
      <div className="relative">
        <input
          {...field}
          type="text"
          id="fullName"
          placeholder="John Doe"
          className={`appearance-none py-3.5 px-3 border rounded shadow-sm w-full text-[#272727] placeholder:text-gray-400 font-medium
            ${showError ? "border-red-500 bg-red-100" : "border-[#dedede]"}
            focus:outline-none focus:border-[#c6c6c6]"`}
          onChange={(e) => {
            field.onChange(e);
            if (!hasInteracted) {
              // when user types
              setHasInteracted(true);
            }
          }}
          onBlur={(e) => {
            field.onBlur(e);
            //on blur as well
            setHasInteracted(true);
          }}
        />

        {/* Checkmark Icon when input is valid */}
        {isValid && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </span>
        )}

        {showError && (
          <div className="text-red-500 text-sm mt-1">{meta.error}</div>
        )}
      </div>
    </div>
  );
}

export default TextInput;
