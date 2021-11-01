const mongodb = require('mongodb');
const expect = require('chai').expect
const sinon = require('sinon');
const proxyquire = require('proxyquire')
require('sinon-mongo');

describe('the sample api', () => {
    let mockId;
    let mockMongoClient
    let mockGameCollection;
    let dbHelper;
    beforeEach(() => {
        mockId = mongodb.ObjectId();

        // inject mock db into the repository
        mockGameCollection = sinon.mongo.collection();

        mockMongoClient = sinon.mongo.mongoClient({
            reporting: sinon.mongo.db()
        });

        dbHelper = proxyquire('./dbHelper', {'../db': mockMongoClient });
    });

    it('returns all the games', () => {
        const mockGames = [{a: 'mock game'}, {another: 'mock game'}];
        mockGameCollection.find
            .returns(sinon.mongo.documentArray(mockGames));

         dbHelper.getAllGames().then(games => {
            expect(games).to.equal(mockGames);
        });
    });

    it('updates a game by its id', () => {
        const mockUpdates = {the: 'updated properties'};
        const mockUpdatedGame = {the: 'updated game'};
        mockGameCollection.updateOne
            .withArgs({ _id: sinon.match(val => mockId.equals(val)) }, { $set: mockUpdates })
            .resolves({ value: mockUpdatedGame });

        dbHelper.addGame(mockId, mockUpdates).then(updatedGame => {
            expect(updatedGame).to.equal(mockUpdatedGame);
        });
    });
});
