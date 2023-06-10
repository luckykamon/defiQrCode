// equipe.service.ts

import {Equipe} from './equipe.types';
import * as equipeSchema from '../../mongoose/equipe.schema';

export const getAll = async (): Promise<Array<Equipe>> => {
    return await equipeSchema.getAll();
}

export const getById = async (_id: string): Promise<Equipe | null> => {
    return await equipeSchema.getById(_id);
}

export const create = async (equipe: Equipe): Promise<Equipe> => {
    return await equipeSchema.create(equipe);
}
