import React from "react";
import Skeleton from "react-loading-skeleton";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/24/solid";

const AnimalCardSkeleton = () => {
    return (
        <div className="w-72 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden bg-blue-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <div className="flex mr-4">
                        <Skeleton containerClassName="flex-1" height={24} />
                    </div>
                    <div className="flex items-center gap-2">
                        <Skeleton containerClassName="flex-1" circle width={24} height={24} />
                        <BookmarkIcon className="size-6 text-gray-600" />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                <div className="relative">
                    <Skeleton containerClassName="flex-1" height={192} borderRadius={6} />
                </div>

                <div className="space-y-2">
                    <div className="flex gap-10">
                        <Skeleton containerClassName="flex-1" width={80} height={20} />
                        <Skeleton containerClassName="flex-1" width={80} height={20} />
                    </div>
                    <Skeleton containerClassName="flex-1" width={160} height={20} />
                    <div className="space-y-1">
                        <Skeleton containerClassName="flex-1" count={3} height={16} />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2 items-center">
                    <MapPinIcon className="size-5 text-gray-600" />
                    <Skeleton containerClassName="flex-1" width={100} height={20} />
                    <div className="flex-1">
                        <Skeleton containerClassName="flex-1" height={36} borderRadius={6} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimalCardSkeleton;