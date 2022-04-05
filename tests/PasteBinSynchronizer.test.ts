import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import eventually from 'wix-eventually';
import { MongoClient } from 'mongodb';
import MockAdapter from 'axios-mock-adapter';
import { PasteBinSynchronizer } from '../src/PasteBinSynchronizer';
import { PasteBinStorage } from '../src/storage/PasteBinStorage';
import { PasteBin,AuthorType } from '../src/PasteBin';
import { generatePasteBinHtml } from './samples/pastePagesGenerator';
import { generatePaste } from './samples/pasteGenerator';
import { PasteBinParser } from '../src/PasteBinParser';


describe('PasteBinSynchronizer', () => {

    const mock = new MockAdapter(axios);
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    let pasteBinSynchronizer : PasteBinSynchronizer;
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
        pasteBinSynchronizer = new PasteBinSynchronizer(pasteBinStorage,new PasteBinParser(axios), 1000);
    });

    afterEach(() => {
        mock.reset();
    });

    function setAxiosMocks(publicPastesPage: string, pastePages : string[][]) {
        mock.onGet('https://pastebin.com/archive').reply(200, publicPastesPage);
        pastePages.map(page  => mock.onGet(`https://pastebin.com/${page[0]}`).reply(200, page[1]));
    }

    test('it should insert a single paste with its fields when no data yet', async () => {
        const expectedPaste : PasteBin =  generatePaste();
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
        const paste : PasteBin = generatePaste({ author: null, authorType: AuthorType.GUEST  });

        const { pastePage, publicPastesPage } = generatePasteBinHtml([paste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(paste.pasteBinKey))).toMatchObject({ authorType:AuthorType.GUEST, author:null});  
    });

    test('it should insert unknown author type and null author when html contains unknown term', async () => {
        const paste : PasteBin = generatePaste({ author: null, authorType: AuthorType.UNKNOWN  });

        const { pastePage, publicPastesPage } = generatePasteBinHtml([paste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(paste.pasteBinKey))).toMatchObject({ authorType:AuthorType.UNKNOWN, author:null});  
    });

    test('it should insert title normalized', async () => {
        const paste : PasteBin = generatePaste({ title: null  });
      
        const { pastePage, publicPastesPage } = generatePasteBinHtml([paste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();

        expect((await pasteBinStorage.getByPasteBinKey(paste.pasteBinKey))).toMatchObject(({ title: null }));  
    });


    test('it should not populate paste when html is not following structure', async () => {
        const paste : PasteBin = generatePaste();
      
        const { publicPastesPage } = generatePasteBinHtml([paste]);
        
       
        setAxiosMocks(publicPastesPage, [[paste.pasteBinKey,'<html></html']]);
   
        await pasteBinSynchronizer.sync();

        expect((await pasteBinStorage.listPasteBins())).toHaveLength(0); 
    });


    test('it should throw when recents pastes page is currupted', async () => {
        const paste : PasteBin = generatePaste();
      
     
        setAxiosMocks('<html></html', [[paste.pasteBinKey,'<html></html']]);

        await expect(pasteBinSynchronizer.sync()).rejects.toThrow('no recent paste bins');
    });


    test('it should convert paste date from CDT to UTC', async () => {
        const utcDate = new Date(Date.UTC(96, 1, 2, 3, 4, 5)); // Fri, 02 Feb 1996 03:04:05 GMT
        const paste : PasteBin = generatePaste({ datePosted:utcDate });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([paste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();

        expect((await pasteBinStorage.getByPasteBinKey(paste.pasteBinKey))).toMatchObject({ datePosted:utcDate });  
    });


    test('it should insert content with removed traling space', async () => {
        const newPaste : PasteBin = generatePaste({ title: null, content:'console.log '  });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toMatchObject({ content:'console.log' });
         
    });


    test('it should insert content ant not remove starting spaces', async () => {
        const newPaste : PasteBin = generatePaste({ title: null, content:' console.log'  });

        
        const { pastePage, publicPastesPage } = generatePasteBinHtml([newPaste]);
       
        setAxiosMocks(publicPastesPage, pastePage);
   
        await pasteBinSynchronizer.sync();
   
        expect((await pasteBinStorage.getByPasteBinKey(newPaste.pasteBinKey))).toMatchObject({ content:' console.log' });
         
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
