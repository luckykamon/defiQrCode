import {QrCode} from './qrcode.types';
import {qrcodeSchema} from './qrcode.schema';
import * as db from '../../mongoose/db';
import mongoose from "mongoose";

export const deleteByDefiId = async (defiId: string) => {
    await db.connect();
    return qrcodeSchema.deleteMany({defiId: defiId});
};


export const get = async (idQrCode: String): Promise<QrCode | null> => {
    await db.connect();
    if (idQrCode !== "verification") { // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
        return qrcodeSchema.findOne({idQrCode: idQrCode, isSolution: true});
    } else {
        return null;
    }
};

export const getAll = async (equipeId: string): Promise<Array<QrCode>> => {
    if (!mongoose.Types.ObjectId.isValid(equipeId)) {
        return [];
    }

    await db.connect();
    return qrcodeSchema.find({equipeId: equipeId, idQrCode: {$ne: "verification"}});
};

export const getByIdQrCodeSolution = async (idQrCode: string): Promise<QrCode | null> => {
    await db.connect();
    if (idQrCode !== "verification") { // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
        return qrcodeSchema.findOne({idQrCode: idQrCode, isSolution: true});
    } else {
        return null;
    }
};

export const getByIdQrCodeEquipe = async (idQrCode: string, equipeId: string): Promise<QrCode | null> => {
    await db.connect();
    if (idQrCode !== "verification") { // Un humain doit avoir au préalable validé le QrCode afin qu'il n'y ai pas de problème (on pense à des conneries que pourraient uploader des utilisateurs)
        return qrcodeSchema.findOne({idQrCode: idQrCode, equipeId: equipeId});
    } else {
        return null;
    }
};

export const getByDefiId = async (defiId: string): Promise<Array<QrCode> | null> => {
    await db.connect();
    return qrcodeSchema.find({defiId: defiId});
};

export const create = async (qrcode: QrCode): Promise<QrCode> => {
    await db.connect();
    return await qrcodeSchema.create(qrcode);
};
