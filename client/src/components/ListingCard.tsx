import React from 'react';
import { GameListingInterface } from "../../types";

interface ListingCardProps {
    listing: GameListingInterface;
}

const ListingCard = ({ listing }: ListingCardProps) => {
    const tags = listing.tags?.map((tag) => {
        return tag.toUpperCase();
    });

    const image = listing.images?.map((image) => {
        if (image) {
         return image.url;
        }
    });

    if (image[0].length === 0) {
        return (
            <div className="border border-snowgrey bg-gray-100 h-84 p-4 rounded-lg w-full">
                <div className="flex flex-col items-center">
                    <div className="text-xl font-bold mb-4">{listing.title}</div>
                    <div className="font-bold mb-4">{listing.subtitle}</div>
                    <div className="mb-4">{listing.description}</div>
                    <div className="flex justify-center space-between text-xs">
                        {tags?.join('  ')}
                    </div>
                </div>
            </div>
    );
    }
    return (
            <div className="border border-snowgrey bg-gray-100 h-84 p-4 rounded-lg w-full">
                <div className="flex flex-col items-center">
                    <div className="border border-black-200">
                        <img src={`${image[0]}`} width={200} alt="logo"/>
                    </div>
                    <div className="text-xl font-bold mb-4">{listing.title}</div>
                    <div className="font-bold mb-4">{listing.subtitle}</div>
                    <div className="mb-4">{listing.description}</div>
                    <div className="flex justify-center space-between text-xs">
                        {tags?.join('  ')}
                    </div>
                </div>
            </div>
    );
};

export default ListingCard;
