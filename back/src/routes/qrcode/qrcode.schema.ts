import Mongoose from 'mongoose';
import {QrCode} from "./qrcode.types";

const collectionName = "qrcode";

const CollectionSchema = new Mongoose.Schema({
        idQrCode: {
            type: String,
            required: true
        },
        number: {
            type: Number,
            required: false
        },
        indice: {
            type: String,
            required: false
        },
        date: {
            type: Date,
            required: false,
            default: null
        },
        defiId: {
            type: String,
            required: false,
            default: null
        },
        equipeId: {
            type: String,
            required: false,
            default: null
        },
        isSolution: {
            type: Boolean,
            required: false,
            default: false
        },
        listImage: {
            type: [{
                path: {
                    type: String,
                    required: true
                },
                alt: {
                    type: String,
                    required: true
                }
            }],
            required: false,
            default: []
        }
    }
);

export const qrcodeSchema = Mongoose.model<QrCode>(collectionName, CollectionSchema);
