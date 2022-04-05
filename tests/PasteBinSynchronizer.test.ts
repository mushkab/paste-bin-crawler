import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import eventually from 'wix-eventually';
import { Db, MongoClient } from 'mongodb';
import MockAdapter from 'axios-mock-adapter';
import { PasteBinSynchronizer } from '../src/PasteBinSynchronizer';
import { AuthorType, PasteBin, PasteBinStorage } from '../src/PasteBinStorage';
import { generatePasteBinHtml } from './samples/pastePagesGenerator';
import { generatePaste } from './samples/pasteGenerator';
import { PasteBinParser } from '../src/PasteBinParser';


describe('PasteBinSynchronizer', () => {

    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    const mock = new MockAdapter(axios);

    let pasteBinSynchronizer : PasteBinSynchronizer;
    let pasteBinStorage : PasteBinStorage;
    let db : Db;


    beforeAll(async () => {
        await client.connect();
        const uuid = uuidv4();
        db = client.db(`paste_synchronizer_dev_${uuid}`);
    });

    afterAll(async () => {
        await client.close();
    });

    beforeEach(() => {
        pasteBinStorage = new PasteBinStorage(db);
        pasteBinSynchronizer = new PasteBinSynchronizer(pasteBinStorage,new PasteBinParser(axios), 1000);
    });

    afterEach(async () => {
        mock.reset();
        await db.dropCollection('paste_bin');
    });

    function setAxiosMocks(publicPastesPage: string, pastePages : string[][]) {
        mock.onGet('https://pastebin.com/archive').reply(200, publicPastesPage);
        pastePages.map(page  => mock.onGet(`https://pastebin.com/${page[0]}`).reply(200, page[1]));
    }


    test('it should insert a single paste with its fields when no data yet', async () => {
        const expectedPaste : PasteBin = { datePosted: new Date(Date.UTC(2022,4,2, 8, 2, 2)),pasteBinKey:'some_id', content: 'console.log()', title:'hello world', author:'mush', authorType: AuthorType.USER  };  
        const { pastePage, publicPastesPage } = generatePasteBinHtml([expectedPaste]);
    
        setAxiosMocks(publicPastesPage, pastePage);

        await pasteBinSynchronizer.sync();

        expect(await pasteBinStorage.listPasteBins()).toEqual([expect.objectContaining(expectedPaste)]);    
    });


    test('it should insert only new pastes', async () => {
        const existingPaste : PasteBin = { datePosted: new Date(Date.UTC(2022,4,2, 8, 2, 2)),pasteBinKey:'existing_paste_key', content: `console.log('existing paste')`, title:'existing paste', author:'user x', authorType: AuthorType.USER  };
        const newPaste : PasteBin = { datePosted: new Date(Date.UTC(2022,4,2, 8, 2, 2)),pasteBinKey:'new_paste_key', content:  `console.log('new paste')`, title:'new paste', author:'user y', authorType: AuthorType.USER  };

        await pasteBinStorage.insert([existingPaste]);

        const { pastePage, publicPastesPage } = generatePasteBinHtml([existingPaste, newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect(await pasteBinStorage.listPasteBins()).toEqual(expect.arrayContaining([expect.objectContaining(existingPaste), expect.objectContaining(newPaste)]));
         
    });


    test('it should insert guest normalized', async () => {
        const newPaste : PasteBin = generatePaste({ author: null, authorType: AuthorType.GUEST  });

        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toEqual(expect.objectContaining({ authorType:AuthorType.GUEST, author:null}));  
    });

    test('it should insert title normalized', async () => {
        const newPaste : PasteBin = generatePaste({ title: null  });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();

        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toEqual(expect.objectContaining({ title: null }));  
    });


    test('it should insert content with removed traling space', async () => {
        const newPaste : PasteBin = generatePaste({ title: null, content:'console.log '  });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toEqual(expect.objectContaining({ content:'console.log' }));
         
    });


    test('it should insert content ant not remove starting spaces', async () => {
        const newPaste : PasteBin = generatePaste({ title: null, content:' console.log'  });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toEqual(expect.objectContaining({ content:' console.log' }));
         
    });


    it('should eventually insert paste after calling start', async () => {
        
        const expectedPaste : PasteBin = generatePaste();  
        const { pastePage, publicPastesPage } = generatePasteBinHtml([expectedPaste]);
    
        setAxiosMocks(publicPastesPage, pastePage);

        pasteBinSynchronizer.start();


        await eventually(async () => {
            expect(await pasteBinStorage.listPasteBins()).toEqual([expect.objectContaining(expectedPaste)]); 
        });

        pasteBinSynchronizer.stop();    
    });


    it('should eventually insert the first pastes and then the second', async () => {
        
        const firstPaste : PasteBin = generatePaste();  
        const { pastePage, publicPastesPage } = generatePasteBinHtml([firstPaste]);
    
        setAxiosMocks(publicPastesPage, pastePage);

        pasteBinSynchronizer.start();


        await eventually(async () => {
            expect(await pasteBinStorage.listPasteBins()).toEqual([expect.objectContaining(firstPaste)]); 
        });

        const secondPaste : PasteBin = generatePaste({ pasteBinKey:'new one'});  
        const { pastePage : newPastePage, publicPastesPage: newPublicPastePage } = generatePasteBinHtml([secondPaste, firstPaste]);

        setAxiosMocks(newPublicPastePage, newPastePage);


        await eventually(async () => {
            expect(await pasteBinStorage.listPasteBins()).toEqual([expect.objectContaining(firstPaste), expect.objectContaining(secondPaste)]); 
        });

        pasteBinSynchronizer.stop();    
    });
});