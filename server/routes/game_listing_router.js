'use strict'

const express = require('express');
const router = express.Router();

const { getAllGames, addGame, deleteGame } = require('../helpers/dbHelper');

// Get all game listings from the db
router.get('/', async (req, res) => {
    try {
        const response = await getAllGames();
        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Add new game listing to the db
router.post('/addGame', async (req, res) => {
    const { gameInfo } = req.body;
    try {
       const response = await addGame(gameInfo.title, gameInfo);
       res.send(!!response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

// Delete a game listing from the db
router.delete('/deleteGame', async (req, res) => {
    const gameTitle = req.body.data;
    try {
        const response = await deleteGame(gameTitle);
        res.send(!!response);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;
