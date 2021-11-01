'use strict'

const client = require('../db');

const listings = client.db("games").collection("listings");

/* Gets all games in the database */
async function getAllGames() {
    const cursor = await listings.find().sort({_id: -1});
    return await cursor.toArray();
}

/*
* Will check if the game exists in the database already.
* If it does, it will update the information
* If it does not, it will add a new listing to the db
*
* @param string nameOfGame - the name of the game being added
*
* @param {object} gameInfo - the game information to add to the db
*/
async function addGame(titleOfGame, gameInfo) {
    console.log('title of game', titleOfGame, gameInfo )
    const result = await listings.updateOne(
        { title: titleOfGame },
        { $set: gameInfo },
        { upsert: true });
    console.log(`${result.matchedCount} game matched the query criteria.`);
    if (result.upsertedCount > 0) {
        console.log(`A new game was inserted with the id ${result.upsertedId._id}`);
    } else {
        console.log(`${result.modifiedCount} game was updated.`);
    }
    return result;
}

/*
* Will delete a game from the db.
*
* @param string titleOfGame - the title of the game we wish to delete
*/
async function deleteGame(titleOfGame) {
    const result = await listings.deleteOne({ title: titleOfGame });
    console.log(`${result.deletedCount} document(s) was/were deleted.`);
    return result
}

module.exports = {
    getAllGames,
    addGame,
    deleteGame
}
