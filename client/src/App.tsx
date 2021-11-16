import React, { useState, useEffect } from 'react';

import GameListings from './components/GameListings';
import GameModal from './components/GameModal';
import { getGameListings } from './api';
import { GameListingInterface } from '../types';


function App() {
  const [gameListings, setGameListings] = useState<GameListingInterface[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const getListings = async () => {
    const listings = await getGameListings();
    // @ts-ignore
    setGameListings(listings);
  };

  function openModal() {
      setModalIsOpen(true);
    }

  function closeModal() {
    setModalIsOpen(false);
  }

  useEffect(() => {
    getListings();
  }, [modalIsOpen]);

  if (!gameListings) {
    return <div />;
  }

  return (
      <div className="grid grid-cols-1 gap-4">
        <div className="card">
          <GameListings games={gameListings} openGameForm={openModal} />
          <div className="row-span-2">
            <GameModal closeModal={closeModal} modalIsOpen={modalIsOpen} />
          </div>
        </div>
      </div>
  );
}


export default App;
