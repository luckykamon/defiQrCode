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

// Fonction qui supprime une valeur de localStorage
export function deleteLocalStorageKey(key: string): void {
    localStorage.removeItem(key);
}

// Fonction qui supprime toutes les valeurs de localStorage à l'exeption de saveByDefiId afin de ne supprimer que sa sauvegarde du defi actuel
export function deleteLocalStorage(messageConfirmation = undefined): void {
    if (messageConfirmation === undefined || window.confirm(messageConfirmation)) {
        for (const key in localStorage) {
            if (key !== "saveByDefiId") {
                localStorage.removeItem(key);
            }
        }
        if (messageConfirmation !== undefined) {
            window.location.reload();
        }
    }
}

