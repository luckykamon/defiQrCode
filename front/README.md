# Front defiQrCode

### 1. Fichier environnement

A nommer .env à la racine du dossier `front`


| Nom                  | Description                                                                                                                | Exemple                               |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| REACT_APP_URL_BACK   | Url de l'API back de l'application                                                                                         | http://localhost:4011                 |
| PUBLIC_URL           | Chemin de base public de votre application.                                                                                | /                                     |
| REACT_APP_URL_QRCODE | Url de l'API de generation de QrCode (https://documenter.getpostman.com/view/12914728/2s93ecwAaw)                          | https://generateqrcode.lucasbodin.com |
| PORT                 | Port utilisé par l'application avec npm start (dont le workflow.yml de github avec .env.ci). Facultatif, 3000 par default | 4010                                  |

### 2. Installation

```shell
npm i
```

### 3. Run en développement

```shell
npm start
```

### 4. Build en production

```shell
npm run build
```
