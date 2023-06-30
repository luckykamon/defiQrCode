import express from "express";
import indexRouter from './index.router';
import equipeRoute from './equipe/equipe.route';
import qrcodeRoute from './qrcode/qrcode.route';
import defiRoute from './defi/defi.route';
import * as path from "path";

const rootRouter = express.Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/api/equipe', equipeRoute);
rootRouter.use('/api/qrcode', qrcodeRoute);
rootRouter.use('/api/defi', defiRoute);
rootRouter.use('/images', express.static(path.join(__dirname, '../../public/images')));
rootRouter.use('/public/uploads', express.static(path.join(__dirname, '../../public/uploads')));

export default rootRouter;
