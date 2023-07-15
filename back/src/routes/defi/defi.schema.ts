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
                type: String
            },
            alt: {
                type: String
            }
        },
        required: false,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    fichier: {
        type: {
            path: {
                type: String
            },
            alt: {
                type: String
            }
        },
        required: false,
        default: null
    },
    password:{
        type: String,
        required: true
    }
});

export const defiSchema = Mongoose.model<Defi>(collectionName, CollectionSchema);
