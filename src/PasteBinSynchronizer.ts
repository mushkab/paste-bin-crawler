
import _ from 'lodash';
import { PasteBinStorage } from './PasteBinStorage';
import { PasteBinParser } from './PasteBinParser';

export class PasteBinSynchronizer {

    private intervalId?: NodeJS.Timeout;

    constructor(private readonly pasteBinStorage : PasteBinStorage, private readonly parser : PasteBinParser, private readonly intervalInMs = 120000) {

    }

    async sync() : Promise<void> {
        const recentPastesBins : string[]  = await this.parser.parseRecentsPastesPage();   
  
        const existingPasteBins = (await this.pasteBinStorage.listPastesBinsByKeys(recentPastesBins)).map(p => p.pasteBinKey);

        const pastesIdsToInsert = _.difference(recentPastesBins,existingPasteBins);

        const pastesToInsert = await Promise.all(pastesIdsToInsert.map(async (pasteBinKey: string) => {

            try {

                const pasteBin =  await this.parser.parsePastePage(pasteBinKey);

                return pasteBin;   

            } catch(e) {
                
            }
        }));

        return this.pasteBinStorage.insert(_.compact(pastesToInsert));     
    }

    start() : void {
        if(this.intervalId) {
            throw new Error('sync already running - plz stop before');
        }

        let isRunning = false;
        this.intervalId = setInterval(async () => { 
            if(isRunning) {
                return;
            }

            isRunning = true;

            try {
                await this.sync();
            } catch(e){
                console.log('start error');
            }
            finally {
                isRunning = false;
            }
        },this.intervalInMs);
    }

    stop() : void {
        if(!this.intervalId) {
            throw new Error('cant stop if sync never started');
        }
        clearInterval(this.intervalId);
    }
}

