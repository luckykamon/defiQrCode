import {QrCode} from './qrcode.types';
import {qrcodeSchema} from './qrcode.schema';
import * as db from '../../mongoose/db';

export const get = async (idQrCode: String): Promise<QrCode | null> => {
    await db.connect();
    return qrcodeSchema.findOne({idQrCode: idQrCode, isSolution: true});
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
