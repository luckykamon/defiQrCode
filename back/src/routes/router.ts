import express from "express";
import indexRouter from './index.router';
import equipeRoute from './equipe/equipe.route';

const rootRouter = express.Router();

rootRouter.use('/', indexRouter);
rootRouter.use('/api/equipe', equipeRoute);

export default rootRouter;
