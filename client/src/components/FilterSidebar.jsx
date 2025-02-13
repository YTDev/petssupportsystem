import React from "react";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Cat, Dog } from 'lucide-react';

const FilterSidebar = () => {
  return (
    <div className="sticky top-[71px] z-40 w-full bg-white md:top-[79px] transform-gpu">
      <div className="w-full shadow-sm">
        <div className="mx-auto w-full py-2 md:pr-6 max-w-8xl">
          <div className="flex w-full items-center overflow-x-auto scrollbar-hide">
            <div className="shrink-0 md:w-6" />
            <button className="relative min-w-fit rounded-full py-1.5 text-sm h-10 px-1.5 bg-gray-800/10 hover:bg-gray-800/20">
              <AdjustmentsHorizontalIcon className="h-5 w-7" />
            </button>
            <div className="mx-2 h-7 border-r border-gray-200" />
            <div>
              <div className="flex h-10 rounded-full mr-2 bg-gray-800/10" role="tablist" aria-orientation="horizontal">
                <button 
                  className="flex items-center rounded-full px-3.5 py-1.5 bg-gray-800/20 font-semibold"
                  role="tab"
                  aria-selected="true"
                  tabIndex={0}
                >
                  <Dog className="h-5 w-5" />
                  <span className="ml-1 text-sm font-medium">Dogs</span>
                </button>
                <button 
                  className="flex items-center rounded-full px-3.5 py-1.5"
                  role="tab"
                  aria-selected="false"
                  tabIndex={-1}
                >
                  <Cat className="h-5 w-5" />
                  <span className="ml-1 text-sm font-medium">Cats</span>
                </button>
              </div>
            </div>
            <div className="mr-auto flex h-10 w-full">
              {[
                "New Joiners",
                "Youngest",
                "Male",
                "Female"
              ].map((label) => (
                <button
                  key={label}
                  className="relative mr-2 min-w-fit rounded-full px-3.5 py-1.5 text-sm font-medium bg-gray-800/10 hover:bg-gray-800/20"
                >
                  {label}
                </button>
              ))}
              <div className="w-2 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;