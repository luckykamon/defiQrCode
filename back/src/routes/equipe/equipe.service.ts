import {Equipe} from './equipe.types';
import {equipeSchema} from './equipe.schema';
import * as db from '../../mongoose/db';
import {Types} from "mongoose";

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

export const create = async (equipe: Equipe): Promise<Equipe> => {
    await db.connect();
    return await equipeSchema.create(equipe);
}
