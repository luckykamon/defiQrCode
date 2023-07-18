import Mongoose from 'mongoose';
import {Equipe} from "./equipe.types";

const collectionName = "equipe";

const CollectionSchema = new Mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        motTrouve: {
            type: Boolean,
            default: false
        },
        dateMot: {
            type: Date,
            default: null
        },
        defiId: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'defi',
            required: true,
            default: null
        },
    }
);

export const equipeSchema = Mongoose.model<Equipe>(collectionName, CollectionSchema);
