import mongoose from 'mongoose';

export interface Defi {
    _id?: mongoose.Types.ObjectId,
    name: string,
    image: {
        path: string | null,
        alt: string | null
    },
    description: string,
    fichier: {
        path: string | null,
        alt: string | null
    },
    password: string,
    motCache: string
}

export interface File {
    name: string;
    path: string;
}

export interface QrCode {
    number: number;
    indice: string;
    listImage?: File[];
}

export interface Body {
    name: string;
    image: File;
    description: string;
    fichier: File;
    qrcode: QrCode[];
    motCache: string;
}

export interface DefiWithId extends Defi {
    _id: mongoose.Types.ObjectId;
}
