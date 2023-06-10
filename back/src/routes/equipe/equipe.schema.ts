import Mongoose from 'mongoose';
import {Equipe} from "./equipe.types";

const collectionName = "equipe";

const CollectionSchema = new Mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    }
);

export const equipeSchema = Mongoose.model<Equipe>(collectionName, CollectionSchema);
