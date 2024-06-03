// const { MongoClient } = require('mongodb');
// const uri = 'mongodb://localhost:27017/nextdb'; // Replace with your MongoDB URI
// const client = new MongoClient(uri);
// export let db;
// var db_connect= async()=>{
//     await client.connect();
//     db = client.db('nextdb');
// }
// db_connect();

import mongoose from "mongoose";

export const connectMongoDB = async () => {
    let isConnected = false;
    if (isConnected) { return; }
    const mongoUri = 'mongodb://localhost:27017/nextdb';
    if (!mongoUri) {
        throw new Error('Please define the MONGODB_URI');
    }
    const db = await mongoose.connect(mongoUri);
    isConnected = db.connections[0].readyState === 1;
};