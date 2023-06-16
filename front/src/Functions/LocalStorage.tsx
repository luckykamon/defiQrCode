// Fonction qui écrit une valeur dans localStorage
export function setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

// Fonction qui récupère une valeur de localStorage
export function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
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
