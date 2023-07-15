import {QrCode} from './qrcode.types';
import {qrcodeSchema} from './qrcode.schema';
import * as db from '../../mongoose/db';

export const get = async (idQrCode: String): Promise<QrCode | null> => {
    await db.connect();
    if (idQrCode !== "verification") { // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
        return qrcodeSchema.findOne({idQrCode: idQrCode, isSolution: true});
    } else {
        return null;
    }
}

export const getAll = async (equipeId: String): Promise<Array<QrCode>> => {
    await db.connect();
    return qrcodeSchema.find({equipeId: equipeId});
}

export const getByIdQrCodeSolution = async (idQrCode: string): Promise<QrCode | null> => {
    await db.connect();
    return qrcodeSchema.findOne({idQrCode: idQrCode, isSolution: true});
}

export const getByIdQrCodeEquipe = async (idQrCode: string, equipeId: string): Promise<QrCode | null> => {
    await db.connect()
    return qrcodeSchema.findOne({idQrCode: idQrCode, equipeId: equipeId});
}

export const create = async (qrcode: QrCode): Promise<QrCode> => {
    console.log(qrcode)
    await db.connect();
    return await qrcodeSchema.create(qrcode);
}
