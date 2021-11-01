import axios from 'axios';

import { GameListingInterface } from '../types';
const url = 'http://localhost:3300/listings'

    export const addGame = async (gameInfo: GameListingInterface) => {
        try {
            return await axios.post(`${url}/addGame`, {gameInfo});
        } catch (err) {
            console.log(`Error posting game listing: ${err}`);
            return false
        }
    }

    export const deleteGame = async (gameTitle: string) => {
        try {
            return await axios.delete(`${url}/deleteGame`, {data: {gameTitle}});
        } catch (err) {
            console.log(`Error posting game listing: ${err}`);
            return false
        }
    }

    export const getGameListings = async () => {
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (err) {
            console.log(`Error from listings api: ${err}`);
            return false;
        }
    }
