import { Db, Document, Collection } from 'mongodb';
import { PasteBin } from '../PasteBin';


interface ListPasteBinsParams {
    skip: number;
    limit: number;
}

export class PasteBinStorage {

    private readonly collection : Collection;

    constructor(db: Db) {
        this.collection = db.collection('paste_bin');
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
            throw new Error(`paste bin key ${key} no found`);
        }

        return PasteBinStorage.documentToPasteBin(res);
    }
}
 