import Mongoose from 'mongoose';
import {Defi} from "./defi.types";

const collectionName = "defi";

const CollectionSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: {
            path: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        },
        required: false
    },
    description: {
        type: String,
        required: true
    },
    fichier: {
        type: {
            path: {
                type: String,
                required: true
            },
            alt: {
                type: String,
                required: true
            }
        },
        required: false,
        default: null
    }
});

export const defiSchema = Mongoose.model<Defi>(collectionName, CollectionSchema);
