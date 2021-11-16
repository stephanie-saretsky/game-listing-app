'use strict'

const { MongoClient } = require('mongodb');
const uri = "mongo url with password would go here";

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client
