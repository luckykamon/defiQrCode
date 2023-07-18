// Fonction qui écrit une valeur dans localStorage
export function setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

// Fonction qui récupère une valeur de localStorage
export function getLocalStorage(key: string): string | null {
    if (localStorage.getItem("defiId") === null) {
        setLocalStorage("defiId", "64b66ef1b45f50b48e23eef4"); // Valeur par défaut
    }
    return localStorage.getItem(key);
}

export function getLocalStorageStartWith(keyStart: string): string[] {
    return Object.keys(localStorage).filter(key => key.startsWith(keyStart));
}

// Fonction qui supprime toutes les valeurs de localStorage
export function deleteLocalStorage(messageConfirmation = undefined): void {
    if (messageConfirmation === undefined) {
        localStorage.clear();
    } else if (window.confirm(messageConfirmation)) {
        localStorage.clear();
        window.location.reload();
    }
}
