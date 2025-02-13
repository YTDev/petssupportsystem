import React, { useState } from "react";
import {
    BookmarkIcon,
} from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/solid";
import AnimalCardSkeleton2 from "./AnimalCardSkeleton";

const AnimalCard2 = ({
    name,
    age,
    image,
    sex,
    status = "Available",
    isLoading = false
}) => {
    if (isLoading) {
        return <AnimalCardSkeleton2 />;
    }

    const [isBookmark, setIsBookmark] = useState(false);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'available':
                return { bg: "bg-green-100", text: "text-green-800" };
            case 'foster':
                return { bg: "bg-blue-100", text: "text-blue-800" };
            case "pending":
                return { bg: "bg-yellow-100", text: "text-yellow-800" };
            default:
                return { bg: "bg-gray-100", text: "text-gray-800" };
        }
    };

    const statusColor = getStatusColor(status);

    return (
        <div className="rounded-lg bg-white shadow-sm overflow-hidden relative w-60 h-82">
            {/* Full-width image */}
            <img
                src={image}
                alt={`Photo of ${name}`}
                className="w-full h-full object-cover"
            />

            {/* Overlay controls at the top */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-medium ${statusColor.bg} ${statusColor.text}`}>
                    {status}
                </span>
                <div className="flex items-center gap-2">
                    {/* <button
            className="p-2 rounded-full bg-white/80 hover:bg-white"
            onClick={() => {
              alert("Shared!");
            }}
          >
            <ShareIcon className="size-5 text-gray-800" />
          </button> */}
                    <button
                        onClick={() => setIsBookmark(!isBookmark)}
                        className="p-2 rounded-full bg-white/80 hover:bg-white focus:outline-none"
                        aria-label={isBookmark ? "Remove bookmark" : "Add bookmark"}
                    >
                        <BookmarkIcon
                            className={`size-5 transition-colors ${isBookmark ? "fill-yellow-400 text-blue-500" : "text-gray-800"
                                }`}
                        />
                    </button>
                </div>
            </div>

            {/* Information box overlay at the bottom */}
            <div className="absolute inset-x-4 bottom-3 h-15 flex-1 overflow-hidden rounded-2xl bg-white/80 py-1 pl-6">
                <h3 className="text-lg font-semibold text-gray-900">{name} ({sex})</h3>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-m text-gray-600 ">
                            <span>{age}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard2;