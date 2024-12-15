import React from 'react';

const BusRouteCard = ({ routeName, image, fare }) => {
    return (
        <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white flex items-center">
            <img
                src={image}
                alt={routeName}
                className="w-16 h-16 rounded-full object-cover mr-4"
            />
            <div>
                <h3 className="text-lg font-semibold">{routeName}</h3>
                <p className="text-sm text-gray-600">{fare}</p>
            </div>
        </div>
    );
};

export default BusRouteCard;
