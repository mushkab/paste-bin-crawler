import axios from 'axios';
import { MongoClient } from 'mongodb';
import { PasteBinParser } from './src/PasteBinParser';
import {  PasteBinStorage } from './src/PasteBinStorage';
import { PasteBinSynchronizer } from './src/PasteBinSynchronizer';


const url = 'mongodb://localhost:27017';
const syncIntervalTimeInMs = 60 * 2 * 1000; // sec * min * ms


async function init() {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db('paste_synchronizer_production');
    const storage = new PasteBinStorage(db);
    const synchronizer = new PasteBinSynchronizer(storage,new PasteBinParser(axios),60000);
    synchronizer.start();
}


init();