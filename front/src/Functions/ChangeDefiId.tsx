import {deleteLocalStorageKey, getLocalStorage, getLocalStorageStartWith, setLocalStorage} from "./LocalStorage";

export function changeDefiFromIdToId(currentDefiId, newDefiId): void {
    // On récupère les sauvegardes des défis
    let saveByDefiId = getLocalStorage("saveByDefiId") ? JSON.parse(getLocalStorage("saveByDefiId")) : [];

    // On supprime la sauvegarde précédente qui n'est plus à jour pour le currentDefiId
    saveByDefiId = saveByDefiId.filter((save) => save.defiId !== currentDefiId);

    // On ajoute la sauvegarde actualisée pour le currentDefiId
    const currentObject = {};
    currentObject["defiId"] = currentDefiId;
    currentObject["equipeId"] = getLocalStorage("equipeId");
    currentObject["equipeName"] = getLocalStorage("equipeName");
    currentObject["equipeURL"] = getLocalStorage("equipeURL");
    currentObject["temps-mot"] = getLocalStorage("temps-mot");
    const localeStorageQrCodes = getLocalStorageStartWith("QrCode-");
    for (let i = 0; i < localeStorageQrCodes.length; i++) {
        currentObject[localeStorageQrCodes[i]] = JSON.parse(getLocalStorage(localeStorageQrCodes[i]));
    }
    saveByDefiId.push(currentObject);
    setLocalStorage("saveByDefiId", JSON.stringify(saveByDefiId));

    // On récupère la sauvegarde du nouveau défi et on applique les bonnes valeurs
    setLocalStorage("defiId", newDefiId);
    deleteLocalStorageKey("equipeId");
    deleteLocalStorageKey("equipeName");
    deleteLocalStorageKey("equipeURL");
    deleteLocalStorageKey("temps-mot");
    for (let i = 0; i < localeStorageQrCodes.length; i++) {
        deleteLocalStorageKey(localeStorageQrCodes[i]);
    }
    const newSaves = saveByDefiId.filter((save) => save.defiId === newDefiId);
    if (newSaves.length > 0) {
        const newSave = newSaves[0];
        newSave?.["equipeId"] && setLocalStorage("equipeId", newSave["equipeId"]);
        newSave?.["equipeName"] && setLocalStorage("equipeName", newSave["equipeName"]);
        newSave?.["equipeURL"] && setLocalStorage("equipeURL", newSave["equipeURL"]);
        newSave?.["temps-mot"] && setLocalStorage("temps-mot", newSave["temps-mot"]);
        const QrCodeInNewSave = Object.keys(newSave).filter(key => key.startsWith("QrCode-"));
        for (let i = 0; i < QrCodeInNewSave.length; i++) {
            newSave?.[QrCodeInNewSave[i]] && setLocalStorage(QrCodeInNewSave[i], JSON.stringify(newSave[QrCodeInNewSave[i]]));
        }
    }
}
