import {Defi, DefiWithId} from './defi.types';
import {defiSchema} from './defi.schema';
import * as db from '../../mongoose/db';
import mongoose from "mongoose";

export const getAll = async (): Promise<DefiWithId[]> => {
    await db.connect();
    return defiSchema.find();
}

export const getById = async (id: string): Promise<DefiWithId | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    await db.connect();
    return defiSchema.findById(new mongoose.Types.ObjectId(id));
};

export const getMotCacheById = async (id: string): Promise<string | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    await db.connect();
    return (await defiSchema.findById(new mongoose.Types.ObjectId(id)))?.motCache ?? null;
}

export const create = async (defi: Defi): Promise<DefiWithId> => {
    await db.connect();
    const createdDefi = await defiSchema.create(defi);
    return {
        ...createdDefi.toObject(),
        _id: createdDefi._id
    };
};

export const update = async (defiId: string, body: any): Promise<DefiWithId | null> => {
    if (!mongoose.Types.ObjectId.isValid(defiId)) {
        return null;
    }

    await db.connect();
    return defiSchema.findByIdAndUpdate(new mongoose.Types.ObjectId(defiId), body);
};
