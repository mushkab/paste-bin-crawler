import moment from 'moment';
import 'moment-timezone';
import { Axios } from 'axios';
import * as cheerio from 'cheerio';
import { PasteBin,AuthorType } from './PasteBinStorage';

export class PasteBinParser {
    constructor(private readonly axios : Axios) {

    }

    async parsePastePage(key : string) : Promise<PasteBin>{
        const res = await this.axios.get(`https://pastebin.com/${key}`);
        const pasteHtmlQuery = cheerio.load(res.data);

        const userName = pasteHtmlQuery('body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-bottom > div.username > a').text();
        const guestText = pasteHtmlQuery('body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-bottom > div.username').text();
        const title = pasteHtmlQuery('body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-top > h1').text();
        const date = pasteHtmlQuery('body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-bottom > div.date > span').attr('title') || '';
        
        const utcDate = moment.tz(date,'dddd Do of MMMM YYYY hh:mm:ss A z','America/Chicago').utc().toDate();
        const content = pasteHtmlQuery('body > div.wrap > div.container > div.content > div.post-view > textarea').text().trimEnd();

        const isGuest = !userName && guestText === 'a guest';
        const noTitle = title === 'Untitled';

        const pasteBin : PasteBin= { authorType: isGuest ? AuthorType.GUEST : AuthorType.USER, author: isGuest ? null : userName, title: noTitle ? null : title, datePosted: utcDate, content, pasteBinKey:key };

        return pasteBin;
    }

    async parseRecentsPastesPage() : Promise<string[]>  {
        const res = await this.axios.get('https://pastebin.com/archive');
        const recentPastesHtmlQuery = cheerio.load(res.data);

        const pastesBins : string[]  = [];

        recentPastesHtmlQuery('body > div.wrap > div.container > div.content > div.page.page-archive.-top > div.archive-table > table > tbody > tr > td:nth-child(1) > a').each((i,e) => {
            const pasteId = recentPastesHtmlQuery(e).attr('href')?.substring(1);
            if(pasteId) {
                pastesBins.push(pasteId);
            }
        });

        return pastesBins;
    
    }
}