import moment from 'moment';
import 'moment-timezone';
import { Axios } from 'axios';
import * as cheerio from 'cheerio';
import { PasteBin,AuthorType } from './PasteBin';

export class PasteBinParser {
    constructor(private readonly axios : Axios) {

    }

    private readonly userNameContainerPath = 'body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-bottom > div.username';
    private readonly userNameTextPath = `${this.userNameContainerPath} > a`;
    private readonly titlePath = 'body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-top > h1';
    private readonly datePath = 'body > div.wrap > div.container > div.content > div.post-view > div.details > div.info-bar > div.info-bottom > div.date > span';
    private readonly contentPath = 'body > div.wrap > div.container > div.content > div.post-view > textarea';
    private readonly pasteBinKeyPath = 'body > div.wrap > div.container > div.content > div.page.page-archive.-top > div.archive-table > table > tbody > tr > td:nth-child(1) > a';

    async parsePastePage(key : string) : Promise<PasteBin>{
        const res = await this.axios.get(`https://pastebin.com/${key}`);
        const $ = cheerio.load(res.data);

    
        const userNameContainerElement = $(this.userNameContainerPath);

        if(userNameContainerElement.length === 0) {
            throw new Error('structure is unexpected - no username container');
        }

        const userNameText = $(this.userNameTextPath).text();
        const guestText = userNameContainerElement.text();

        const titleElement = $(this.titlePath);

        if(titleElement.length === 0) {
            throw new Error('structure is unexpected - no title container');
        }

        const title = titleElement.text();


        const dateElement = $(this.datePath);

        if(dateElement.length === 0) {
            throw new Error('structure is unexpected - no date container');
        }

        const date = dateElement.attr('title');

        if(!date) {
            throw new Error('structure is unexpected - no date title attr');
        }
        
        const utcDate = moment.tz(date,'dddd Do of MMMM YYYY hh:mm:ss A z','America/Chicago').utc().toDate();


        const contentElement = $(this.contentPath);

        if(contentElement.length === 0) {
            throw new Error('structure is unexpected - no content container');
        }

        const content = contentElement.text().trimEnd();

        const authorType = userNameText ? AuthorType.USER : guestText === 'a guest' ? AuthorType.GUEST : AuthorType.UNKNOWN;
        const noTitle = title === 'Untitled';

        const pasteBin : PasteBin= { authorType, author: authorType === AuthorType.USER ? userNameText : null, title: noTitle ? null : title, datePosted: utcDate, content, pasteBinKey:key };

        return pasteBin;
    }

    async parseRecentsPastesPage() : Promise<string[]>  {
        const res = await this.axios.get('https://pastebin.com/archive');
        const $ = cheerio.load(res.data);

        const pastesBins : string[]  = [];

        const tableKeyElements = $(this.pasteBinKeyPath);

        if(tableKeyElements.length === 0) {
            throw new Error('structure is unexpected - no recent paste bins');
        }

        tableKeyElements.each((i,e) => {
            const pasteId = $(e).attr('href')?.substring(1);
            if(pasteId) {
                pastesBins.push(pasteId);
            }
        });

        return pastesBins;
    
    }
}