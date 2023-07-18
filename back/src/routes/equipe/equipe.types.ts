import mongoose from "mongoose";

export interface Equipe {
    _id: string;
    name: string;
    motTrouve: boolean;
    dateMot: Date | null;
    defiId: mongoose.Types.ObjectId;
}
