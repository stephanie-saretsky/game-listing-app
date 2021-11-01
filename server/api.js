'use strict';

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const http = require('http');

const client = require('./db');
const listingRouter = require('./routes/game_listing_router');

const app = express();

const initializeAPI = async () => {
    /* Start Game Listing API */
    app.use(bodyParser.json({ limit: '100mb' })); // will parse json bodies
    app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' })); // will parse json bodies
    app.use(cookieParser());
    app.use(compression());

    const enableCors = cors({
        origin: true,
        credentials: true,
    });

    app.use('/listings', enableCors, listingRouter);

    const server = http.createServer(app);

    client.connect().then(() => {
        server.listen(3300, () => {
            console.log('Connected to db and server listening on port 3300');
        });
    });
};

initializeAPI();


module.exports = initializeAPI;
