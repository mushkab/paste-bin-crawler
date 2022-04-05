export enum AuthorType {
    UNKNOWN,
    USER,
    GUEST,
}

export interface PasteBin {
    _id?:string;
    pasteBinKey:string;
    title: string | null;
    datePosted: Date;
    author: string | null;
    authorType:AuthorType
    content: string;
}