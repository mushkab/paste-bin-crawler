import _ from 'lodash';
import { PasteBin,AuthorType } from '../../src/PasteBin';


export function generatePaste(paste?: Partial<PasteBin>) {
    const existingPaste : PasteBin = { datePosted: new Date(Date.UTC(2022,4,2, 8, 2, 2)),pasteBinKey:'generared_paste_key', content: `console.log('generated paste')`, title:'generated paste', author:'generated user', authorType: AuthorType.USER  };

    return _.assign(existingPaste, paste);

}