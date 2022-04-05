
import { v4 as uuidv4 } from 'uuid';
import { MongoClient } from 'mongodb';
import { PasteBinStorage } from '../src/storage/PasteBinStorage';
import { PasteBin } from '../src/PasteBin';
import { generatePaste } from './samples/pasteGenerator';


describe('PasteBinStorage', () => {

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    let pasteBinStorage : PasteBinStorage;
    let dbName : string;

    beforeAll(async () => {
        await client.connect();
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(async () => {
        const uuid = uuidv4();
        dbName = `paste_synchronizer_dev_${uuid}`;
        pasteBinStorage = await PasteBinStorage.create(dbName, client);
    });

    test('it should throw when calling insert twice with same pasteBinKey', async () => {
        const expectedPaste : PasteBin =  generatePaste({ pasteBinKey:'x'});

        await pasteBinStorage.insert([expectedPaste]);


        await expect(pasteBinStorage.insert([expectedPaste])).rejects.toThrow('duplicate');
  
        expect(await pasteBinStorage.listPasteBins()).toHaveLength(1);    
    });


    test('it should throw when calling get by key which doesnt exist', async () => {
        const expectedPaste : PasteBin =  generatePaste({ pasteBinKey:'x'});

        await pasteBinStorage.insert([expectedPaste]);


        await expect(pasteBinStorage.getByPasteBinKey('not_there')).rejects.toThrow('not found');
   
    });
 

});
