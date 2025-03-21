import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BookmarkIcon } from "@heroicons/react/24/outline";

const AnimalCardSkeleton = () => {
    return (
        <div className="rounded-lg bg-white shadow-sm overflow-hidden relative w-full h-82 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-full">
        <Skeleton className="h-full" baseColor="#D3D3D3" highlightColor="#BCBCBC" />
      </div>

      {/* Top overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        {/* Status placeholder */}
        <Skeleton width={70} height={24} borderRadius={9999} />

        {/* Bookmark button placeholder */}
        <div className="p-2 rounded-full bg-white/80">
          <BookmarkIcon className="size-5 text-gray-200" />
        </div>
      </div>

      {/* Bottom info overlay */}
      <div className="absolute inset-x-4 bottom-3 h-15 flex-1 overflow-hidden rounded-2xl bg-white/80 py-1 pl-6">
        {/* Name and sex placeholder */}
        <Skeleton width={140} height={24} className="mb-2" />

        {/* Age placeholder */}
        <Skeleton width={80} height={20} />
      </div>
    </div>
    );
};

export default AnimalCardSkeleton;
