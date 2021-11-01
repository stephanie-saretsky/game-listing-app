import React from "react";

import ListingCard from "./ListingCard";
import {GameListingInterface} from "../../types";

interface GameListingsProps {
    games: GameListingInterface[];
    openGameForm(): void;
}

const GameListings: React.FC<GameListingsProps> = (props) => {
    const { games, openGameForm } = props;

    // add search if time allows

    return (
        <div className="px-4 pt-3 mt-25 shadow-light rounded-lg">
            <header className="mb-8 flex flex-row justify-between">
                <h1 className="flex text-white text-4xl bg-indigo-400 w-80 font-bold italic p-2">
                    GAME CATALOG
                </h1>
                <button
                    className="btn bg-indigo-400 hover:bg-indigo-700 shadow text-white w-40 h-14 font-bold items-center mr-4"
                    onClick={openGameForm}>ADD NEW GAME</button>
            </header>
            <hr className="bg-indigo-100 h-2 border-none my-8" />
            <div>
                <div className="grid-cols-3 grid gap-2 grid-wrap w-50">
                    {games.map((game) => {
                        return (
                            <ListingCard
                                key={`game${game._id}`}
                                listing={game}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default GameListings;
