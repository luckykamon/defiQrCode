export interface QrCode {
    idQrCode: string; // L'id qui est scanné sur un QrCode
    number: number; // Le numéro du QrCode (0, 1, 2, 3, 4, 5, 6, 7, 8, 9...)
    indice: string; // L'indice du QrCode
    date: Date; // La date à laquelle le QrCode a été scanné, null si il s'agit d'un QrCode de solution
    equipeId: string; // L'id de l'équipe qui a scanné le QrCode, null si il s'agit d'un QrCode de solution
    isSolution: boolean; // Si le QrCode est une solution ou non
}
