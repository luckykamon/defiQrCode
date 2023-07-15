import {Request, Response, Router} from 'express';
import * as defiService from './defi.service';
import * as qrcodeService from '../qrcode/qrcode.service';

const defiRouter: Router = Router();

interface File {
    name: string;
    path: string;
}

interface QrCode {
    number: string;
    indice: string;
    listImage: File[];
}

interface Body {
    name: string;
    image: File;
    description: string;
    fichier: File;
    qrcode: QrCode[];
}

function validateFile(file: any): file is File {
    return typeof file === 'object' &&
        file !== null &&
        typeof file.name === 'string' &&
        typeof file.path === 'string';
}

function validateQrCode(qrCode: any): qrCode is QrCode {
    return typeof qrCode === 'object' &&
        qrCode !== null &&
        !isNaN(Number(qrCode.number)) &&
        typeof qrCode.indice === 'string' &&
        Array.isArray(qrCode.listImage) &&
        qrCode.listImage.every(validateFile);
}

function validateBody(body: any): body is Body {
    return typeof body === 'object' &&
        body !== null &&
        typeof body.name === 'string' &&
        validateFile(body.image) &&
        typeof body.description === 'string' &&
        validateFile(body.fichier) &&
        Array.isArray(body.qrcode) &&
        body.qrcode.every(validateQrCode);
}


defiRouter.post('', async (req: Request, res: Response) => {

    if (!validateBody(req.body)) {
        res.status(400).send('Bad request');
        return;
    }


    let defiNew = {
        name: req.body.name,
        description: req.body.description,
        image: {
            path: req.body.image.path,
            alt: "Image représentatif du défi " + req.body.image.name
        },
        fichier: {
            path: req.body.fichier.path,
            alt: "Fichier d'aide du défi " + req.body.fichier.name
        }
    }

    const resultNewDefi = await defiService.create(defiNew);

    for (let qrCodeRequest of req.body.qrcode) {
        let listImage = [];

        for (let image of qrCodeRequest.listImage) {
            listImage.push({
                path: image.path,
                alt: "Image du QRCode " + image.name
            })
        }


        let qrCode = {
            idQrCode: "verification",  // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
            number: parseInt(qrCodeRequest.number),
            indice: qrCodeRequest.indice,
            date: new Date(),
            defiId: resultNewDefi._id,
            equipeId: "random",
            isSolution: true,
            listImage: listImage
        }

        await qrcodeService.create(qrCode)

    }

    res.status(200).send(resultNewDefi)
});

export default defiRouter;
