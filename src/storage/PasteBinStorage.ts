import { Document, Collection, MongoClient } from 'mongodb';
import { PasteBin } from '../PasteBin';


interface ListPasteBinsParams {
    skip: number;
    limit: number;
}


export class PasteBinStorage {

    private constructor(readonly collection: Collection) {
    }

    static documentToPasteBin(document: Document) :  PasteBin {
        return { content: document.content, datePosted:document.datePosted, authorType:document.authorType, author: document.author, title:document.title, pasteBinKey: document.pasteBinKey, _id: document._id.toString() };
    }

    async insert(pastes : PasteBin[]) : Promise<void> {
        await this.collection.insertMany(pastes.map(p => ({pasteBinKey: p.pasteBinKey, author: p.author, datePosted: p.datePosted, authorType:p.authorType, title: p.title, content: p.content })));
    }

    async listPasteBins(params : ListPasteBinsParams = { skip: 0, limit:15}) : Promise<PasteBin[]> {
        const res = await this.collection.find({}, params);
        return (await res.toArray()).map(PasteBinStorage.documentToPasteBin);
    }

    async listPastesBinsByKeys(pasteBinKeys : string[]) : Promise<PasteBin[]>{
        const res = await this.collection.find({ pasteBinKey : { $in : pasteBinKeys } });
        return (await res.toArray()).map(PasteBinStorage.documentToPasteBin);
    }

    async getByPasteBinKey(key :string) : Promise<PasteBin> {
        const res =  await this.collection.findOne({ pasteBinKey: key });

        if(!res) {
            throw new Error(`paste bin key ${key} not found`);
        }

        return PasteBinStorage.documentToPasteBin(res);
    }

    static async create(dbName : string, client : MongoClient) {
        const db = client.db(dbName);
        const collection = db.collection('paste_bin');
        await collection.createIndex({ "pasteBinKey": 1 }, { unique: true });
        return new PasteBinStorage(collection);
    }
}
 