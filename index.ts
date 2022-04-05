import 'dotenv/config';
import axios from 'axios';
import  express from 'express';
import { MongoClient } from 'mongodb';
import { PasteBinParser } from './src/PasteBinParser';
import {  PasteBinStorage } from './src/storage/PasteBinStorage';
import { PasteBinSynchronizer } from './src/PasteBinSynchronizer';
import { initRoutes } from './src/routes';


const url = process.env['MONGO_URI'];
const dbName = process.env['DB_NAME'];
const syncIntervalTimeInMs = 60 * 2 * 1000; // sec * min * ms
const port = process.env['PORT'];

async function init() {
    if(!url || !dbName || !port) {
        throw new Error('plz supply all env vars');
    }
    const app = express();
    app.listen(port, () => {
        console.log(`paste bin app listening on port ${port}`);
    });
    const client = new MongoClient(url);
    await client.connect();
    const storage = await PasteBinStorage.create(dbName, client);
    const synchronizer = new PasteBinSynchronizer(storage,new PasteBinParser(axios),syncIntervalTimeInMs);
    synchronizer.start();
    initRoutes(app, storage);
}


init();