import {Request, Response, Router} from 'express';
import * as db from "../mongoose/db";

const indexRouter: Router = Router();

indexRouter.get('', async (req: Request, res: Response) => {
    let statusDB = await db.connect();
    if (statusDB) {
        res.status(503).send("Api defiQrCode is running and database is connected");
    } else {
        res.status(200).send("Api defiQrCode is running but database is not connected");
    }

});

export default indexRouter;
