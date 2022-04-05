
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

        // paste bin has rate limiter so we minimize to 2 inserts each cycle for not getting blocked
        const pastesIdsToInsert = _.difference(recentPastesBins,existingPasteBins).slice(0,2);

        const pastesToInsert = await Promise.all(pastesIdsToInsert.map(async (pasteBinKey: string) => {

            try {

                const pasteBin =  await this.parser.parsePastePage(pasteBinKey);

                return pasteBin;   

            } catch(e) {

                console.error(e, `error syncing single paste ${pasteBinKey}`);
                
            }
        }));


        console.log('inserting pastes', pastesIdsToInsert);

        return this.pasteBinStorage.insert(_.compact(pastesToInsert));     
    }

    async start() : Promise<void> {
        console.log('started syncing recent pastes');
        if(this.intervalId) {
            throw new Error('sync already running - plz stop before');
        }

        await this.sync();

        let isRunning = false;
        this.intervalId = setInterval(async () => { 
            if(isRunning) {
                return;
            }

            isRunning = true;

            try {
                await this.sync();
                console.log('done sync cycle');
            } catch(e){
                console.error(e, 'error syncing recent pastes');
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

