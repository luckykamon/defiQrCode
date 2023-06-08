import {Request, Response} from 'express';

const indexRouter = require('express').Router()

indexRouter.get('', async (req: Request, res: Response) => {
    res.send("Api defiQrCode is running")
})

module.exports = indexRouter;
