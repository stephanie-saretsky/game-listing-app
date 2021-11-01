'use strict'

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://sick:swum-fireball-dbuser!@sickcluster.w88al.mongodb.net/games?retryWrites=true&w=majority";

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client
