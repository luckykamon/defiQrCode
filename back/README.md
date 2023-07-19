# Back defiQrCode

### 1. Fichier environnement

A nommer .env à la racine du dossier `back`


| Nom           | Description                                                                  | Exemple                                                        |
| ------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------- |
| MONGO_URI     | Url de la base de données.                                                  | mongodb+srv://user:password@clusterName.mongodb.net/collection |
| PASSWORD_DEFI | Mot de passe admin pour modifier n'importe lequel des défis et les valider  | 4JtYXtaVZXrBAVkt7Zbs3zUvo2vn                                   |
| PORT          | Port utilisé par l'application avec npm start. Facultatif, 4011 par default | 4011                                                           |

### 2. Installation

```shell
npm i
```

### 3. Run en développement

```shell
npm run dev
```

### 4. Run en production

```shell
npm start
```
