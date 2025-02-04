import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function FormInput() {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="fullName"
        className="block mb-2 text-[#272727] font-bold text-lg"
      >
        Full name
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Jhon Doe"
          id="fullName"
          value={inputValue}
          onChange={handleInputChange}
          className="appearance-none py-3.5 px-3 border border-[#dedede] rounded shadow-sm w-full focus:outline-none focus:border-[#c6c6c6] text-[#272727] placeholder:text-gray-400 font-medium"
        />

        {inputValue && (
          <span className="absolute inset-y-0 right-3 flex items-center">
            <CheckCircleIcon className="h-7 w-7 text-green-500" />
          </span>
        )}
      </div>
    </div>
  );
}

export default FormInput;
