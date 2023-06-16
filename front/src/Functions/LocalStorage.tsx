// Types pour les arguments de fonction
type LocalStorageKey = string;
type LocalStorageValue = string;

// Créer une fonction qui écrit une valeur dans localStorage
export function setLocalStorage(key: LocalStorageKey, value: LocalStorageValue): void {
    localStorage.setItem(key, value);
}

// Créer une fonction qui récupère une valeur de localStorage
export function getLocalStorage(key: LocalStorageKey): string | null {
    return localStorage.getItem(key);
}

// Créer une fonction qui supprime toutes les valeurs de localStorage
export function deleteLocalStorage(): void {
    if (window.confirm("Etes-vous sûre de vouloir réinitialiser votre progressions ? (Si vous faîtes parti d'une équipe, cela vous déconnectera de celle-ci et ne supprimera pas son avancement)")) {
        localStorage.clear();
        window.location.reload();
    }
}
