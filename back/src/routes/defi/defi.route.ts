import {Response, Router} from 'express';
import {upload} from "../../index";
import * as defiService from "./defi.service";
import * as qrcodeService from "../qrcode/qrcode.service";

const defiRouter: Router = Router();

defiRouter.post('', upload.fields([{name: 'image', maxCount: 1}, {name: 'fichier', maxCount: 1}, {
        name: 'image-0-0',
        maxCount: 1
    }, {name: 'image-0-1', maxCount: 1}, {name: 'image-0-2', maxCount: 1}, {
        name: 'image-1-0',
        maxCount: 1
    }, {name: 'image-1-1', maxCount: 1}, {name: 'image-1-2', maxCount: 1}, {
        name: 'image-2-0',
        maxCount: 1
    }, {name: 'image-2-1', maxCount: 1}, {name: 'image-2-2', maxCount: 1}, {
        name: 'image-3-0',
        maxCount: 1
    }, {name: 'image-3-1', maxCount: 1}, {name: 'image-3-2', maxCount: 1}, {
        name: 'image-4-0',
        maxCount: 1
    }, {name: 'image-4-1', maxCount: 1}, {name: 'image-4-2', maxCount: 1}, {
        name: 'image-5-0',
        maxCount: 1
    }, {name: 'image-5-1', maxCount: 1}, {name: 'image-5-2', maxCount: 1}, {
        name: 'image-6-0',
        maxCount: 1
    }, {name: 'image-6-1', maxCount: 1}, {name: 'image-6-2', maxCount: 1}, {
        name: 'image-7-0',
        maxCount: 1
    }, {name: 'image-7-1', maxCount: 1}, {name: 'image-7-2', maxCount: 1}, {
        name: 'image-8-0',
        maxCount: 1
    }, {name: 'image-8-1', maxCount: 1}, {name: 'image-8-2', maxCount: 1}, {
        name: 'image-9-0',
        maxCount: 1
    }, {name: 'image-9-1', maxCount: 1}, {name: 'image-9-2', maxCount: 1}, {
        name: 'image-10-0',
        maxCount: 1
    }, {name: 'image-10-1', maxCount: 1}, {name: 'image-10-2', maxCount: 1}, {
        name: 'image-11-0',
        maxCount: 1
    }, {name: 'image-11-1', maxCount: 1}, {name: 'image-11-2', maxCount: 1}, {
        name: 'image-12-0',
        maxCount: 1
    }, {name: 'image-12-1', maxCount: 1}, {name: 'image-12-2', maxCount: 1}, {
        name: 'image-13-0',
        maxCount: 1
    }, {name: 'image-13-1', maxCount: 1}, {name: 'image-13-2', maxCount: 1}, {
        name: 'image-14-0',
        maxCount: 1
    }, {name: 'image-14-1', maxCount: 1}, {name: 'image-14-2', maxCount: 1}, {
        name: 'image-15-0',
        maxCount: 1
    }, {name: 'image-15-1', maxCount: 1}, {name: 'image-15-2', maxCount: 1}, {
        name: 'image-16-0',
        maxCount: 1
    }, {name: 'image-16-1', maxCount: 1}, {name: 'image-16-2', maxCount: 1}, {
        name: 'image-17-0',
        maxCount: 1
    }, {name: 'image-17-1', maxCount: 1}, {name: 'image-17-2', maxCount: 1}, {
        name: 'image-18-0',
        maxCount: 1
    }, {name: 'image-18-1', maxCount: 1}, {name: 'image-18-2', maxCount: 1}, {
        name: 'image-19-0',
        maxCount: 1
    }, {name: 'image-19-1', maxCount: 1}, {name: 'image-19-2', maxCount: 1}]),
    async (req: any, res: Response) => {

        if (!req.files || !req.files['image'] || !req.files['fichier']) {
            res.status(400).send("Bad request");
            return;
        }

        let defiNew = {
            name: req.body.name,
            description: req.body.description,
            image: {
                path: req.files['image'][0].path,
                alt: "Image représentatif du défi " + req.body.name
            },
            fichier: {
                path: req.files['fichier'][0].path,
                alt: "Fichier d'aide du défi " + req.body.name
            }
        }

        const resultNewDefi = await defiService.create(defiNew);

        for (let qrCodeId = 0; qrCodeId < 20; qrCodeId++) {
            let indice = req.body['indice-' + qrCodeId]
            let listImage = []
            for (let indiceId = 0; indiceId < 3; indiceId++) {
                if (req.files['image-' + qrCodeId + '-' + indiceId]) {
                    listImage.push({
                        path: req.files['image-' + qrCodeId + '-' + indiceId][0].path,
                        alt: "Image " + indiceId + " du QR Code " + req.body['indice-' + qrCodeId]
                    })
                    // console.log(listImage)
                } else {
                    break;
                }
            }
            if (indice && listImage.length > 0) {
                let qrCode = {
                    idQrCode: "random",
                    number: qrCodeId,
                    indice: req.body['indice-' + qrCodeId],
                    date: new Date(),
                    defiId: resultNewDefi._id,
                    equipeId: "random",
                    isSolution: true,
                    listImage: listImage
                }

                await qrcodeService.create(qrCode);

            } else {
                break;
            }
        }

        res.status(200).send(resultNewDefi)
    });

export default defiRouter;
