import { ObjectId } from 'mongoose';

export interface DefiWithQrCodes extends Defi {
    qrCodes: QrCode[] | null
}

export interface Defi {
    _id?: ObjectId,
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
    password: string
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
}

export interface DefiWithId extends Defi {
    _id: ObjectId;
}

export interface DefiWithStringId extends Omit<DefiWithId, '_id'> {
    _id: string;
}
