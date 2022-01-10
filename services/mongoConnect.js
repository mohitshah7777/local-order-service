'use strict';
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

let cachedDb = null;

export const connectToDatabase = async () => {
    const MONGO_URI = process.env.MONGOURI;
    const DATABASE = process.env.DATABASE_NAME;
    if(cachedDb){
        console.log(`using cashed cachedDb instance`);
        return Promise.resolve(cachedDb);
    }

    const client = await MongoClient.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = await client.db(DATABASE)

    cachedDb = db;
    return db;
}