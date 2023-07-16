require('dotenv').config();
import express, {Request} from 'express';
import multer from 'multer';

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
        let extension;
        const fileMimetypeSplit = file.mimetype.split('/');
        const extensionSplit = file.originalname.split('.');
        if (extensionSplit.length === 0) { // Si le fichier n'a pas d'extension donné par l'utilisateur alors on prend le Mime Type
            extension = fileMimetypeSplit[fileMimetypeSplit.length - 1];
        } else { // Si le fichier a une extension donné par l'utilisateur alors on prend celle-ci (car par exemple les gpx n'ont pas de Mime Type spécifiques)
            extension = extensionSplit[extensionSplit.length - 1];
        }
        cb(null, Math.round(Math.random() * 100000) + "-" + Date.now() + '-' + file.originalname.split(".").slice(0, 1).join("").replace(/[^a-zA-Z0-9]/g, '') + '.' + extension);
    }
});
const imageFileFilter = function (req: Request, file: Express.Multer.File, cb: (error: Error | null, allowed?: boolean) => void) {
    // Accept only image files
    const fileMimeType = file.mimetype;
    if (fileMimeType.split("/")[0] !== 'image' && fileMimeType !== 'application/pdf' && fileMimeType !== 'application/octet-stream') {
        console.log(fileMimeType); // En regardant les logs on pourra voir les mimeType des fichiers que certains utilisateurs essayent d'uploader
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({storage: storage, fileFilter: imageFileFilter});

import rootRouter from './routes/router' // ! Attention au reformat du fichier ! Doit se situer après l'import de multer (après le const de upload)

app.use(cors());
app.use(express.json());
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

export {File, upload};
