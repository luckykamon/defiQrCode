import express, {NextFunction, Request, Response} from 'express';
import path from 'path';
import fs from 'fs';
import sharp from 'sharp';
import {upload} from "../../index";

const imageRouter = express.Router();

const resizeAndCopyImage = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        return next();
    }

    const filename = req.file.filename;
    if (req.file.mimetype.split('/')[0] !== 'image') {
        return next();
    }
    const originalPath = path.join('public/uploads', filename);
    const copyPath = path.join('public/uploads', filename.replace(path.extname(filename), '_original' + path.extname(filename)));

    fs.promises.copyFile(originalPath, copyPath)
        .then(() => {
            return sharp(originalPath)
                .resize({
                    width: 500,
                    withoutEnlargement: true
                })
                .toBuffer();
        })
        .then(buffer => fs.promises.writeFile(originalPath, buffer))
        .then(() => {
            next();
        })
        .catch(err => {
            console.log(err);
            next(err);
        });
};

imageRouter.post('', upload.single('image'), resizeAndCopyImage, async (req: any, res: Response) => {
    if (!req.file) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(200).send(req.file.path);
});

export default imageRouter;
