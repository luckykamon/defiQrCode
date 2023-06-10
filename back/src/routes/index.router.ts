import { Request, Response, Router } from 'express';

const indexRouter: Router = Router();

indexRouter.get('', async (req: Request, res: Response) => {
    res.send("Api defiQrCode is running");
});

export default indexRouter;
