import {Defi} from './defi.types';
import {defiSchema} from './defi.schema';
import * as db from '../../mongoose/db';
import mongoose from "mongoose";

interface DefiWithId extends Defi {
    _id: mongoose.Types.ObjectId;
}

export const create = async (defi: Defi): Promise<DefiWithId> => {
    await db.connect();
    const createdDefi = await defiSchema.create(defi);
    return {
        ...createdDefi.toObject(),
        _id: createdDefi._id
    };
}
