import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BookmarkIcon } from "@heroicons/react/24/outline";
// import { MapPinIcon } from "@heroicons/react/24/solid";

// const AnimalCardSkeleton = () => {
//     return (
//         <div className="w-72 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
//             {/* Header */}
//             <div className="p-4 border-b border-gray-200">
//                 <div className="flex items-center justify-between">
//                     <div className="flex-1 mr-4">
//                         <Skeleton width={120} height={24} />
//                     </div>
//                     <div className="flex items-center gap-2">
//                         <Skeleton width={80} height={24} borderRadius={20} />
//                         <BookmarkIcon className="size-6 text-gray-200" />
//                     </div>
//                 </div>
//             </div>

//             {/* Content */}
//             <div className="p-4 space-y-4">
//                 <div className="relative">
//                     <Skeleton height={192} borderRadius={6} />
//                 </div>
//                 <div className="space-y-2">
//                     <div className="flex gap-10">
//                         <Skeleton width={80} height={20} />
//                         <Skeleton width={80} height={20} />
//                     </div>
//                     <Skeleton width={160} height={20} />
//                     <div className="space-y-1">
//                         <Skeleton count={3} height={16} />
//                     </div>
//                 </div>
//             </div>

//             {/* Footer */}
//             <div className="p-4 border-t border-gray-200 bg-gray-50">
//                 <div className="flex gap-2 items-center">
//                     <MapPinIcon className="size-5 text-gray-200" />
//                     <Skeleton width={100} height={20} />
//                     <div className="flex-1">
//                         <Skeleton height={36} borderRadius={6} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const AnimalCardSkeleton2 = () => {
    return (
        <div className="rounded-lg bg-white shadow-sm overflow-hidden relative w-60 h-82 animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-full">
        <Skeleton className="h-full" />
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

export default AnimalCardSkeleton2;
