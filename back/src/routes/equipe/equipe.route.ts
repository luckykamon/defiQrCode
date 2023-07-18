import {Request, Response, Router} from 'express';
import * as equipeService from './equipe.service';
import {Equipe} from "./equipe.types";

const equipeRouter: Router = Router();

equipeRouter.get('', async (req: Request, res: Response) => {
    res.send(await equipeService.getAll());
});

equipeRouter.get('/:_id', async (req: Request, res: Response) => {
    res.send(await equipeService.getById(req.params._id));
});

equipeRouter.get('/classement/:_id', async (req: Request, res: Response) => {
    res.send(await equipeService.getClassement(req.params._id));
});

equipeRouter.post('/mot', async (req: Request, res: Response) => {
    res.send(await equipeService.mot(req.body));
});

const validateBody = (body: any): body is Equipe => {
    return typeof body === 'object' &&
        body !== null &&
        typeof body.name === 'string' &&
        typeof body.defiId === 'string' &&
        typeof body.motTrouve === 'boolean' &&
        typeof body.dateMot === 'object' || body.dateMot === null;
};

equipeRouter.post('', async (req: Request, res: Response) => {
    req.body.motTrouve = false;
    req.body.dateMot = null;
    if (!validateBody(req.body)) {
        res.status(400).send('Bad request');
        return;
    }
    res.send(await equipeService.create(req.body));
});

export default equipeRouter;
