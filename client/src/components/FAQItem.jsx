import React from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

const FAQItem = ({ question, answer }) => {
  return (
    <details className="group pt-6 first:pt-0">
      <summary className="flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-md text-left ring-offset-4 focus:outline-none focus-visible:ring-2 md:gap-6">
        <span className="text-lg font-medium text-gray-900">{question}</span>

        <div className="relative flex h-6 w-6">
          <IoAddCircleOutline className="h-6 w-6 absolute inset-0 transition-opacity duration-300 text-gray-600 group-open:opacity-0" />

          <IoRemoveCircleOutline className="h-6 w-6 absolute inset-0 transition-opacity duration-300 text-gray-600 opacity-0 group-open:opacity-100" />
        </div>
      </summary>
      <div className="pr-8 py-4 md:pr-12">
        <p className="text-base text-gray-600">{answer}</p>
      </div>
    </details>
  );
};

export default FAQItem;
