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
        (file.name == null || typeof file.name === 'string') &&
        (file.path == null || typeof file.path === 'string');
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
        body.image === null || validateFile(body.image) &&
        typeof body.description === 'string' &&
        body.fichier === null || validateFile(body.fichier) &&
        Array.isArray(body.qrcode) &&
        body.qrcode.every(validateQrCode);
}

function generatePassword() {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '-_,.;';

    function generateRandomChars(length: number, possibleChars: string) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * possibleChars.length);
            result += possibleChars[randomIndex];
        }
        return result;
    }

    const allChars = lower + upper + numbers + symbols;

    let password = generateRandomChars(4, lower);
    password += generateRandomChars(4, upper);
    password += generateRandomChars(4, numbers);
    password += generateRandomChars(4, symbols);
    password += generateRandomChars(6 + Math.floor(Math.random() * 10), allChars);

    // Shuffle password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}


defiRouter.post('', async (req: Request, res: Response) => {

    if (!validateBody(req.body)) {
        res.status(400).send('Bad request');
        return;
    }

    const passwordDefi = generatePassword();

    let defiNew = {
        name: req.body.name,
        description: req.body.description,
        image: {
            path: req.body?.image?.path ? req.body.image.path : null,
            alt: req.body?.image?.name ? "Image représentatif du défi " + req.body?.image?.name : null
        },
        fichier: {
            path: req.body?.fichier?.path ? req.body.fichier.path : null,
            alt: req.body?.fichier?.name ? "Fichier d'aide du défi " + req.body.fichier.name : null
        },
        password: passwordDefi
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

    const resultNewDefiWithPassword = resultNewDefi;
    resultNewDefiWithPassword.password = passwordDefi;

    res.status(200).send(resultNewDefiWithPassword)
});

export default defiRouter;
