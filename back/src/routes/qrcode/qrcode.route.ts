import {Request, Response, Router} from 'express';
import * as qrcodeService from './qrcode.service';

const qrcodeRouter: Router = Router();

qrcodeRouter.get('/getInfo/:idQrCode', async (req: Request, res: Response) => {
    const result = await qrcodeService.get(req.params.idQrCode);
    if (result === null) {
        res.status(400).send(null);
    } else {
        res.status(200).send(result);
    }
})

qrcodeRouter.get('/:equipeId', async (req: Request, res: Response) => {
    res.status(200).send(await qrcodeService.getAll(req.params.equipeId));
})

qrcodeRouter.post('', async (req: Request, res: Response) => {
    let qrcodeSoluce = await qrcodeService.getByIdQrCodeSolution(req.body.idQrCode);
    if (qrcodeSoluce != null) {
        let qrcodeEquipe = await qrcodeService.getByIdQrCodeEquipe(req.body.idQrCode, req.body.equipeId);
        if (qrcodeEquipe != null) {
            res.status(400).send("Ce QrCode a déjà été scanné par votre équipe.");
            return;
        } else {
            let newQrCode = {
                idQrCode: req.body.idQrCode,
                number: qrcodeSoluce.number,
                indice: qrcodeSoluce.indice,
                date: new Date(),
                defiId: qrcodeSoluce.defiId,
                equipeId: req.body.equipeId,
                isSolution: false
            }
            res.status(200).send(await qrcodeService.create(newQrCode));
        }
    } else {
        res.status(400).send("Ce QrCode n'est pas une solution.");
    }
});

export default qrcodeRouter;
