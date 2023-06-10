import {Request, Response} from 'express';

const equipeRouter = require('express').Router()
const equipeService = require('./equipe.service')

equipeRouter.get('', async (req: Request, res: Response) => {
    console.log("router")
    res.send(await equipeService.getAll())
})

equipeRouter.get('/:id', async (req: Request, res: Response) => {
    res.send(await equipeService.getById(req.params.id))
})

equipeRouter.post('', async (req: Request, res: Response) => {
    res.send(await equipeService.create(req.body))
})

module.exports = equipeRouter;
