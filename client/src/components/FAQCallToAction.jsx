import React from "react";

const FAQCallToAction = () => {
  return (
    <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl bg-blue-50 px-6 py-8 text-center md:mt-16 md:gap-8 md:p-8">
      <div>
        <h4 className="text-xl font-semibold text-gray-900">
          Still have questions?
        </h4>
        <p className="text-base md:text-lg mt-2 text-gray-600">
          Can't find the answer you're looking for? Contact us!
        </p>
      </div>
      <a href="mailto:contact@test.com">
        <button
          className="cursor-pointer tracking-wider lg:block px-6 py-3 font-semibold text-sm bg-amber-200 border border-amber-200 
            rounded-3xl text-amber-700 "
        >
          Get in touch
        </button>
      </a>
    </div>
  );
};

export default FAQCallToAction;
