import React from "react";
import { Heart, Calendar, Home } from "lucide-react";

const AnimalCard = ({ 
    name, 
    age,
    description,
    image,
    status = "Available",
    homeDetails
 }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);

    return (
        <div className="w-72 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {status}
                        </span>
                        <button
                            onClick={() => setIsFavorite(!isFavorite)}
                            className="focus:outline-none">
                                <Heart className={`transition-colors ${isFavourite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} size={20}/>
                            </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
                
                <img src={image || "/api/placeholder/280/180"} alt={`Photo of ${name}`} className="w-full h-48 object-cover rounded-md" />
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>{age}</span>
                    </div>
                </div>
            </div>

            {homeDetails && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home size={16} />
                    <span>{homeDetails}</span>
                </div>
            )}

            <p className="text-sm text-gray-600">{description}</p>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Learn More
                    </button> 
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Adopt Me
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AnimalCard;