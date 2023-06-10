import * as db from './db';
import Mongoose, {Types} from 'mongoose';
import {Equipe} from "../routes/equipe/equipe.types";

const collectionName = "equipe";

const CollectionSchema = new Mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }, {
        toObject: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
            }
        }
    }
);

let equipeSchema = Mongoose.model<Equipe>(collectionName, CollectionSchema);


export const getAll = async () => {
    await db.connect();
    return equipeSchema.find();
}

export const getById = async (_id: string) => {
    if (!Types.ObjectId.isValid(_id)) {
        return null;
    }

    await db.connect();
    return equipeSchema.findById(_id);
}

export const create = async (equipe: object) => {
    await db.connect();
    return await equipeSchema.create(equipe);
}
