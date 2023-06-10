import { Request, Response, Router } from 'express';
import * as equipeService from './equipe.service';

const equipeRouter: Router = Router();

equipeRouter.get('', async (req: Request, res: Response) => {
    res.send(await equipeService.getAll());
});

equipeRouter.get('/:_id', async (req: Request, res: Response) => {
    res.send(await equipeService.getById(req.params._id));
});

equipeRouter.post('', async (req: Request, res: Response) => {
    res.send(await equipeService.create(req.body));
});

export default equipeRouter;
