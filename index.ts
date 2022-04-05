import axios from 'axios';
import  express from 'express';
import { MongoClient } from 'mongodb';
import { PasteBinParser } from './src/PasteBinParser';
import {  PasteBinStorage } from './src/storage/PasteBinStorage';
import { PasteBinSynchronizer } from './src/PasteBinSynchronizer';
import { initRoutes } from './src/routes';


const url = 'mongodb://localhost:27017';
const dbName = 'paste_synchronizer_production';
const syncIntervalTimeInMs = 60 * 2 * 1000; // sec * min * ms
const port = 3000;


async function init() {
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