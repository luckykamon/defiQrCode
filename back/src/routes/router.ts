import express from "express";
import indexRouter from './index.router';
import equipeRoute from './equipe/equipe.route';
import qrcodeRoute from './qrcode/qrcode.route';

const rootRouter = express.Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/api/equipe', equipeRoute);
rootRouter.use('/api/qrcode', qrcodeRoute);

export default rootRouter;
