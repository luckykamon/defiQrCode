require('dotenv').config();
import express, {Request} from 'express';
import multer from 'multer'

const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4011;
const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) {
        // Spécifiez l'emplacement où vous souhaitez enregistrer les fichiers téléchargés
        cb(null, 'public/uploads');
    },
    filename: async function (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) {
        // Définissez le nom du fichier comme vous le souhaitez
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const imageFileFilter = function (req: Request, file: Express.Multer.File, cb: (error: Error | null, allowed?: boolean) => void) {
    // Accept only image files
    // if (!file.mimetype.startsWith('image/')) {
    //     return cb(new Error('Only image files are allowed!'), false);
    // }
    cb(null, true);
};
const upload = multer({storage: storage, fileFilter: imageFileFilter});

import rootRouter from './routes/router';

app.use(cors());
app.use(express.json());

app.use(cors());
app.use(rootRouter);


app.listen(PORT, () => {
    console.log(`Server has started and is listening on port ${PORT}.`);
});

interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

export {File, upload}
