import {Defi, DefiWithId} from './defi.types';
import {defiSchema} from './defi.schema';
import * as db from '../../mongoose/db';
import mongoose from "mongoose";
import Mongoose from "mongoose";

export const getById = async (id: string): Promise<DefiWithId | null> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    await db.connect();
    return defiSchema.findById(new mongoose.Types.ObjectId(id));
}

export const create = async (defi: Defi): Promise<DefiWithId> => {
    await db.connect();
    const createdDefi = await defiSchema.create(defi);
    return {
        ...createdDefi.toObject(),
        _id: new Mongoose.Schema.Types.ObjectId(createdDefi._id.toString())
    };
}
