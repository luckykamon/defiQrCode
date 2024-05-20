import {Request, Response, Router} from 'express';
import * as defiService from './defi.service';
import * as qrcodeService from '../qrcode/qrcode.service';
import {Body, File, QrCode as QrCodeDefi} from './defi.types';
import mongoose from "mongoose";
import {sendMail} from "../../mail/sendMail";

const defiRouter: Router = Router();


const validateFile = (file: any): file is File => {
    return typeof file === 'object' &&
        file !== null &&
        (file.name == null || typeof file.name === 'string') &&
        (file.path == null || typeof file.path === 'string');
};

const validateQrCode = (qrCode: any): qrCode is QrCodeDefi => {
    return typeof qrCode === 'object' &&
        qrCode !== null &&
        !isNaN(Number(qrCode.number)) &&
        typeof qrCode.indice === 'string' &&
        Array.isArray(qrCode.listImage) &&
        qrCode.listImage.every(validateFile);
};

const validateBody = (body: any): body is Body => {
    return typeof body === 'object' &&
        body !== null &&
        typeof body.name === 'string' &&
        body.image === null || validateFile(body.image) &&
        typeof body.description === 'string' &&
        body.fichier === null || validateFile(body.fichier) &&
        typeof body.motCache === 'string' &&
        Array.isArray(body.qrcode) &&
        body.qrcode.every(validateQrCode);
};

const generatePassword = () => {
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';

    function generateRandomChars(length: number, possibleChars: string) {
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * possibleChars.length);
            result += possibleChars[randomIndex];
        }
        return result;
    }

    const allChars = lower + upper + numbers;

    let password = generateRandomChars(4, lower);
    password += generateRandomChars(4, upper);
    password += generateRandomChars(4, numbers);
    password += generateRandomChars(6 + Math.floor(Math.random() * 10), allChars);

    // Shuffle password
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
};

defiRouter.get('/navbar', async (req: Request, res: Response) => {
    const defis = await defiService.getAll();
    const promises = defis.map(async defi => {
        const qrCodesByDefiId = await qrcodeService.getByDefiIdSolution(defi._id.toString());
        if (!qrCodesByDefiId || qrCodesByDefiId.length === 0) {
            // Cas où il n'y a pas de QrCode pour ce défi, ce qui ne peut pas arriver
            return null;
        }
        let qrCodeInVerification = false;
        qrCodesByDefiId.forEach(qrCode => {
            if (qrCode.idQrCode === "verification") {
                qrCodeInVerification = true;
            }
        });
        if (qrCodeInVerification) {
            return null;
        }

        return {
            _id: defi._id.toString(),
            name: defi.name,
            qrCode0: qrCodesByDefiId.filter(item => item.number === 0)?.[0]?.idQrCode,
            nbQrCode: qrCodesByDefiId.length
        };
    });
    const results = (await Promise.all(promises)).filter(item => item !== null);
    res.status(200).send(results);
});

defiRouter.get('/:defiId', async (req: Request, res: Response) => {
    const defi = await defiService.getById(req.params.defiId);
    if (defi === null) {
        res.status(404).send('Not found');
        return;
    } else {
        if ((req.query?.password !== defi?.password && req.query?.password !== process.env.PASSWORD_DEFI) || req.query?.password === undefined) {
            const qrCodesByDefiId = await qrcodeService.getByDefiId(req.params.defiId);
            if (!qrCodesByDefiId) { // Cas où il n'y a pas de QrCode pour ce défi, ce qui ne peut pas arriver
                console.log("Pas de QrCode pour ce défi, il faut regarder parce qu'il doit y avoir un problème; defiId: " + req.params.defiId);
                res.status(404).send('Not found');
                return;
            }
            let qrCodeInVerification = false;
            qrCodesByDefiId.forEach(qrCode => {
                if (qrCode.idQrCode === "verification") {
                    qrCodeInVerification = true;
                }
            });
            if (qrCodeInVerification) {
                res.status(404).send('Not found');
                return;
            }
            res.status(200).send({
                "_id": defi._id,
                "name": defi.name,
                "description": defi.description,
                "image": defi.image,
                "fichier": defi.fichier
            });
        } else {
            const qrCodesByDefiId = await qrcodeService.getByDefiId(req.params.defiId);
            res.status(200).send({
                "_id": defi._id,
                "name": defi.name,
                "description": defi.description,
                "image": defi.image,
                "fichier": defi.fichier,
                "qrCodes": qrCodesByDefiId,
                "motCache": defi.motCache,
                "password": defi.password
            });
        }
    }
});

const createQrCode = async (qrCode: QrCodeDefi, defiId: mongoose.Types.ObjectId) => {
    let listImage = [];
    if (qrCode.listImage) {
        for (let image of qrCode.listImage) {
            listImage.push({
                path: image.path,
                name: "Image du QRCode " + image.name
            });
        }
    }
    let newQrCode = {
        idQrCode: "verification",  // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
        number: qrCode.number,
        indice: qrCode.indice,
        date: new Date(),
        defiId: defiId,
        equipeId: null,
        isSolution: true,
        listImage: listImage
    };
    await qrcodeService.create(newQrCode);
};

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
        password: passwordDefi,
        motCache: req.body.motCache
    };
    let nbQrCodeRequest = 0;
    for (let qrCodeRequest of req.body.qrcode) {
        nbQrCodeRequest++;
        if (qrCodeRequest?.listImage !== undefined) {
            if (qrCodeRequest.listImage.length === 0 || qrCodeRequest.listImage.length > 5) { // On ne peut pas ne pas avoir d'images ou en avoir plus de 5 par QrCode
                res.status(400).send('Bad request'); //Mauvais format de requête
                return;
            }
        }
    }
    if (nbQrCodeRequest <= 1) { // Il faut au moins 2 étapes pour un défi
        res.status(400).send('Bad request'); //Mauvais format de requête
    }
    const resultNewDefi = await defiService.create(defiNew);
    for (let qrCodeRequest of req.body.qrcode) {
        await createQrCode(qrCodeRequest, resultNewDefi._id);
    }
    const resultNewDefiWithPassword = resultNewDefi;
    resultNewDefiWithPassword.password = passwordDefi;

    await sendMail("Création d'un défi", "Le défi " + resultNewDefi.name + " a été créé. Vous pouvez le consulter à l'url suivante : " + process.env.URL_FRONT + "/defi/" + resultNewDefi._id + "?password=" + process.env.PASSWORD_DEFI + "&validateDefi=true");

    res.status(200).send(resultNewDefiWithPassword);
});

defiRouter.put('/:defiId', async (req: Request, res: Response) => {
    const defi = await defiService.getById(req.params.defiId);
    if (defi === null) {
        res.status(404).send('Not found');
        return;
    } else {
        if ((req.query?.password !== defi?.password && req.query?.password !== process.env.PASSWORD_DEFI) || req.query?.password === undefined) {
            res.status(404).send('Not found'); //Mauvais mot de passe
            return;
        } else {
            let nbQrCodeRequest = 0;
            if (req.body?.qrcode !== undefined) {
                for (let qrCodeRequest of req.body.qrcode) {
                    nbQrCodeRequest++;
                    if (qrCodeRequest?.listImage !== undefined) {
                        if (qrCodeRequest.listImage.length === 0 || qrCodeRequest.listImage.length > 5) { // On ne peut pas ne pas avoir d'images ou en avoir plus de 5 par QrCode
                            res.status(400).send('Bad request'); //Mauvais format de requête
                            return;
                        }
                    }
                }
            }
            if (nbQrCodeRequest <= 1) { // Il faut au moins 2 étapes pour un défi
                res.status(400).send('Bad request'); //Mauvais format de requête
            }
            const resultPutDefi = await defiService.update(req.params.defiId, req.body);
            if (resultPutDefi === null) {
                res.status(404).send('Not found');
                return;
            } else {
                //Delete all qrcode with defiId
                await qrcodeService.deleteByDefiId(req.params.defiId);
                for (let qrCodeRequest of req.body.qrcode) {
                    await createQrCode(qrCodeRequest, resultPutDefi._id);
                }
                await sendMail("Modification d'un défi", "Le défi " + resultPutDefi.name + " a été modifié. Vous pouvez le consulter à l'url suivante : " + process.env.URL_FRONT + "/defi/" + resultPutDefi._id + "?password=" + process.env.PASSWORD_DEFI + "&validateDefi=true");
                const qrCodesByDefiId = await qrcodeService.getByDefiId(req.params.defiId);
                res.status(200).send({
                    "_id": resultPutDefi._id,
                    "name": resultPutDefi.name,
                    "description": resultPutDefi.description,
                    "image": resultPutDefi.image,
                    "fichier": resultPutDefi.fichier,
                    "qrCodes": qrCodesByDefiId,
                    "motCache": resultPutDefi.motCache,
                    "password": resultPutDefi.password
                });
            }
        }
    }
});

defiRouter.get('/validate/:defiId', async (req: Request, res: Response) => {
    const defi = await defiService.getById(req.params.defiId);
    if (defi === null) {
        res.status(404).send('Not found');
        return;
    } else {
        if ((req.query?.password !== process.env.PASSWORD_DEFI) || req.query?.password === undefined) { // Uniquement le mot de passe de l'admin
            res.status(404).send('Not found'); //Mauvais mot de passe
            return;
        } else {
            const listQrCode = await qrcodeService.getByDefiId(req.params.defiId);
            if (!listQrCode) {
                res.status(404).send('Not found');
                return;
            }
            for (let qrCode of listQrCode) {
                if (qrCode.isSolution && qrCode?._id !== undefined) {
                    await qrcodeService.update(qrCode._id.toString(), {idQrCode: generatePassword()});
                }
            }
            const qrCodesByDefiId = await qrcodeService.getByDefiId(req.params.defiId);
            res.status(200).send({
                "_id": defi._id,
                "name": defi.name,
                "description": defi.description,
                "image": defi.image,
                "fichier": defi.fichier,
                "qrCodes": qrCodesByDefiId,
                "motCache": defi.motCache,
                "password": defi.password
            });
        }
    }
});

export default defiRouter;
