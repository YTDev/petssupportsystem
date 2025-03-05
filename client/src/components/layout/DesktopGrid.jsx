import React from "react";

const DesktopGrid = ({ images }) => {
  return (
    <div className="max-w-7xl mx-auto my-3 w-full px-4">
      <div className="grid grid-cols-4 gap-2">
        {images.map((src, index) => (
          <div
            key={index}
            className={`m-1 ${index === 0 ? "col-span-2 row-span-2" : ""}`}
          >
            <div
              className={`${
                index === 0 ? "h-[51vh]" : "h-[25vh]"
              } w-full cursor-pointer rounded-2xl overflow-hidden relative transition-transform duration-300 ease-in-out hover:scale-105`}
            >
              <img
                src={src}
                alt={`Image ${index}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopGrid;
