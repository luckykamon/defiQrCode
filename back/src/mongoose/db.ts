import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import {qrcodeSchema} from "../routes/qrcode/qrcode.schema";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;
const SUCCESS_MESSAGE = "Connected to database → OK";

let isConnected = false;

const insertDefaultData = () => {
    // Définition des données par défaut
    const defaultData = [
        {
            idQrCode: 'etape_0',
            number: 0,
            indice: 'Exemple',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: 'LYUpKr6Jwp5J',
            number: 1,
            indice: 'Guitare',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: 'MFCJd5deG2LZ',
            number: 2,
            indice: 'Verbal',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: 'PLb8tfxH6Ngj',
            number: 3,
            indice: 'Mineur',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: '4HIQ7L8B1Ppx',
            number: 4,
            indice: 'Principe',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: 'DcB423kQ8MW2',
            number: 5,
            indice: 'Verbe',
            date: null,
            equipeId: null,
            isSolution: true
        },
        {
            idQrCode: 'Z2pkN69lkPTC',
            number: 6,
            indice: 'Signature',
            date: null,
            equipeId: null,
            isSolution: true
        }

    ];


    defaultData.forEach(defaultQrCode => {
        qrcodeSchema.findOne({idQrCode: defaultQrCode.idQrCode})
            .then(doc => {
                if (!doc) {
                    // S'il n'existe pas, l'insérer
                    qrcodeSchema.create(defaultQrCode)
                        .then(() => console.log('Data inserted'))
                        .catch(error => console.log(error));
                }
            })
            .catch(error => console.log(error));
    });

}

export const connect = async () => {
    try {
        if (isConnected) return SUCCESS_MESSAGE;

        console.log('Trying to connect to database...');
        await Mongoose.connect(mongoUri);
        console.log(SUCCESS_MESSAGE)

        isConnected = true;
        insertDefaultData();
        return SUCCESS_MESSAGE;
    } catch (error) {
        console.log('Error while trying to connect to database => ' + error);
        return null;
    }
}
