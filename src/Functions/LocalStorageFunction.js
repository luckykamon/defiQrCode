//créer une fonction qui écrit une valeur dans localStorage js
export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

//créer une fonction qui récupérère une valeur de localStorage en js
export function getLocalStorage(key) {
    return localStorage.getItem(key);
}

//créer une fonction qui supprime toutes les valeurs de localStorage en js
export function deleteLocalStorage() {
    if (window.confirm("Etes-vous sûre de vouloir réinitialiser votre progressions ?")) {
        localStorage.clear();
        window.location.reload();
    }
}
