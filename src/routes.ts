
import  express from 'express';
import {  PasteBinStorage } from './storage/PasteBinStorage';


export function initRoutes(app : express.Express, storage : PasteBinStorage) {

    app.get('/pastes', async (req : express.Request, res : express.Response, next : express.NextFunction) => {
        try {
            const skip = req.query.skip ? parseInt(req.query.skip as string) : 0;
            const limit = req.query.limit ? parseInt(req.query.limit as string) : 15;
            if(!Number.isSafeInteger(skip) && !Number.isSafeInteger(limit)) {
                throw new Error('invalid query parms');
            }

            const pasteBins  = await storage.listPasteBins({ skip, limit});
            res.json(pasteBins);
        }

        catch(e) {
            next(e);
        }
    });

}