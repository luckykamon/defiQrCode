// Fonction qui écrit une valeur dans localStorage
export function setLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
}

// Fonction qui récupère une valeur de localStorage
export function getLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
}

// Fonction qui supprime toutes les valeurs de localStorage
export function deleteLocalStorage(): void {
    if (window.confirm("Etes-vous sûre de vouloir réinitialiser votre progressions ? (Si vous faîtes parti d'une équipe, cela vous déconnectera de celle-ci et ne supprimera pas son avancement)")) {
        localStorage.clear();
        window.location.reload();
    }
}
