import {Response, Router} from 'express';
import {upload} from "../../index";

const imageRouter: Router = Router();

imageRouter.post('', upload.single('image'), async (req: any, res: Response) => {
    if (!req.file) {
        res.status(400).send("Bad request");
        return;
    }

    res.status(200).send(req.file.path)
});

export default imageRouter;
