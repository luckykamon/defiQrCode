import mongoose from "mongoose";

export interface QrCode {
    _id?: mongoose.Types.ObjectId;
    idQrCode: string; // L'id qui est scanné sur un QrCode
    number: number; // Le numéro du QrCode (0, 1, 2, 3, 4, 5, 6, 7, 8, 9...)
    indice: string; // L'indice du QrCode
    date: Date; // La date à laquelle le QrCode a été scanné, null si il s'agit d'un QrCode de solution
    defiId: mongoose.Types.ObjectId;
    equipeId: mongoose.Types.ObjectId | null; // L'id de l'équipe qui a scanné le QrCode, null si il s'agit d'un QrCode de solution
    isSolution: boolean; // Si le QrCode est une solution ou non
    listImage?: Array<{
        path: string; // Le chemin vers l'image du QrCode
        name: string; // La description de l'image du QrCode
    }>; // La liste des images du QrCode
}
