import {Equipe} from './equipe.types';
import {equipeSchema} from './equipe.schema';
import {qrcodeSchema} from "../qrcode/qrcode.schema";
import * as db from '../../mongoose/db';
import {Types} from "mongoose";
import {QrCode} from "../qrcode/qrcode.types";
import * as defiService from "../defi/defi.service";

export const getAll = async (): Promise<Array<Equipe>> => {
    await db.connect();
    return equipeSchema.find();
}

export const getById = async (_id: string): Promise<Equipe | null> => {
    if (!Types.ObjectId.isValid(_id)) {
        return null;
    }

    await db.connect();
    return equipeSchema.findById(_id);
}

const calculScore = async (listQrCode: QrCode[], listEquipeMotTrouve: Equipe[]): Promise<number | null> => {
    let nbQrCode = await qrcodeSchema.find({isSolution: true, number: {$ne: 0}}); // On ne prend pas en compte le QrCode 0 car c'est celui d'exemple
    let timeStampMin = null;
    let timeStampMax = null;
    let tempsParcoursTimeStamp = 0;
    let tempsMotTimeStamp = 0;
    let equipeId = listQrCode[0]?.equipeId;
    if (listQrCode.length === nbQrCode.length) { // Si l'équipe a trouvé tous les QrCodes
        // let score = 0;
        for (let qrcode of listQrCode) {
            if (timeStampMin === null) {
                timeStampMin = qrcode.date.getTime();
            } else if (timeStampMin > qrcode.date.getTime()) {
                timeStampMin = qrcode.date.getTime();
            }
            if (timeStampMax === null) {
                timeStampMax = qrcode.date.getTime();
            } else if (timeStampMax < qrcode.date.getTime()) {
                timeStampMax = qrcode.date.getTime();
            }
        }
        for (let equipe of listEquipeMotTrouve) {
            if (equipe._id.toString() === equipeId?.toString()) {
                tempsMotTimeStamp = Math.abs((equipe.dateMot ? equipe.dateMot.getTime() : 0) - (timeStampMin ? timeStampMin : 0));
                break;
            }
        }
        if (tempsMotTimeStamp !== 0) { // Si l'équipe a trouvé le mot
            if (timeStampMin !== null && timeStampMax !== null) {
                tempsParcoursTimeStamp = timeStampMax - timeStampMin;
            }
            return Math.round((7200000 / (1 + Math.sqrt(tempsParcoursTimeStamp + tempsMotTimeStamp))));
        }
    }
    return null
}

export const getClassement = async (_id: string): Promise<Array<{
    nameEquipe: string | undefined,
    nbQrCode: number,
    score: number | null,
    isMyEquipe: boolean,
    motTrouve: boolean
}>> => {
    if (!Types.ObjectId.isValid(_id)) {
        return [];
    }

    await db.connect();

    let equipeIdRequest = await equipeSchema.findById(_id);

    let listQrcode: Array<QrCode> = await qrcodeSchema.find({isSolution: false, number: {$ne: 0}, defiId: equipeIdRequest?.defiId}) // On ne prend pas en compte le QrCode 0 car c'est celui d'exemple
    let listEquipeMotTrouve: Array<Equipe> = await equipeSchema.find({motTrouve: true, defiId: equipeIdRequest?.defiId});
    // Créer un objet pour grouper les données par equipeId
    let grouped: { [key: string]: QrCode[] } = {};

    for (let qrcode of listQrcode) {
        if (!qrcode.equipeId) {
            continue
        }
        if (!grouped[qrcode.equipeId.toString()]) {// Si le groupe n'existe pas encore, on le crée
            grouped[qrcode.equipeId.toString()] = [];
        }
        grouped[qrcode.equipeId.toString()].push(qrcode);
    }

    let result = [];
    let id = 0;

    for (let equipeId in grouped) {
        id += 1;
        let nbQrCode = grouped[equipeId].length;
        if (!Types.ObjectId.isValid(equipeId)) {
            continue
        }
        let nameEquipe = (await equipeSchema.findById(equipeId))?.name;
        let score = await calculScore(grouped[equipeId], listEquipeMotTrouve);
        let motTrouve = false;
        for (let equipe of listEquipeMotTrouve) {
            if (equipe._id.toString() === equipeId) {
                motTrouve = true;
            }
        }
        if (equipeId === _id) {
            result.push({
                nameEquipe: nameEquipe,
                nbQrCode: nbQrCode,
                score: score,
                isMyEquipe: true,
                motTrouve: motTrouve
            })
        } else {
            result.push({
                nameEquipe: nameEquipe,
                nbQrCode: nbQrCode,
                score: score,
                isMyEquipe: false,
                motTrouve: motTrouve
            })
        }
    }
    return result
}

export const mot = async (body: { equipeId?: string, mot: string, defiId: string}): Promise<Boolean> => {
    await db.connect();

    const motCache = await defiService.getMotCacheById(body.defiId)

    if (!motCache) {
        console.log("Le mot caché n'as pas été trouve pour l'équipe " + body.equipeId + " . Il y a une erreur dans les données de mongoDB")
        return false;
    }

    let motIsFound = body.mot.toLowerCase().replace(new RegExp(" ", 'g'), "") === motCache;

    if (motIsFound && body.equipeId && Types.ObjectId.isValid(body.equipeId)) {
        await equipeSchema.updateOne({_id: body.equipeId}, {motTrouve: true, dateMot: new Date()});
    }

    return motIsFound;
}

export const create = async (equipe: Equipe): Promise<Equipe> => {
    await db.connect();
    return await equipeSchema.create(equipe);
}
