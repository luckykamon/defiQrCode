import express from "express";
import indexRouter from './index.router';
import equipeRoute from './equipe/equipe.route';
import qrcodeRoute from './qrcode/qrcode.route';
import * as path from "path";

const rootRouter = express.Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/api/equipe', equipeRoute);
rootRouter.use('/api/qrcode', qrcodeRoute);
console.log(path.join(__dirname, 'public/images'))
rootRouter.use('/images', express.static(path.join(__dirname, '../../public/images')));

export default rootRouter;
