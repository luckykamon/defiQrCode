# Le défi QrCode

Le défi QrCode est une application ludique destinée à encourager l'exploration de différents lieux à travers un jeu de piste interactif. Des QR Codes sont disposés à des emplacements spécifiques que les participants doivent trouver et scanner avec leur appareil mobile. Chaque scan révèle un indice qui les aide à progresser dans le jeu et à obtenir un indice pour trouver le mot caché. Le défi est chronométré, ajoutant une dimension compétitive au jeu. Il est également possible d'y jouer en équipe offrant ainsi une expérience passionnante à la fois pour les organisateurs et les participants.

## Sommaire

- [Mise en place](#mise-en-place)
  - [1 - Préparation du défi](#1---prparation-du-dfi)
  - [2 - Organisation du défi](#2---organisation-du-dfi)
  - [3 - Exécution du défi](#3---excution-du-dfi)
  - [4 - Foire aux questions](#4---foire-aux-questions)
- [Installation](#installation)
  - [Front](#front)
  - [Back](#back)
- [Features à réaliser](#features--raliser)

## Mise en place

<a id="1---prparation-du-dfi"></a>
### 1 - Preparation du defi

La première étape consiste à sélectionner un emplacement approprié pour votre défi. Photographiez plusieurs endroits potentiels pour placer des QR Codes.

Certains emplacements peuvent devenir inaccessibles pour diverses raisons. Avoir plusieurs options vous garantit un maximum de flexibilité.

Après avoir fait votre sélection, afin de soumettre votre proposition, rendez-vous sur la page de création de défi:
http://localhost:4010/defi

Une fois approuvée par un administrateur, vous pourrez télécharger votre feuille de route et imprimer les QR Codes. Si vous apportez des modifications, le défi sera temporairement indisponible jusqu'à nouvelle approbation.

Vous devez ensuite imprimer et plastifier les QR Codes pour les protéger contre les intempéries. Vous pouvez trouver une plastifieuse A4 à un prix abordable sur Leboncoin: https://www.leboncoin.fr/recherche?text=plastifieuse%20A4&price=min-10

Perforez ensuite les QR Codes plastifiés pour pouvoir les attacher le jour du défi. Vous pouvez trouver une perforatrice à un prix abordable sur Leboncoin: https://www.leboncoin.fr/recherche?text=perforatrice%20feuille&price=min-3

<a id="2---organisation-du-dfi"></a>
### 2 - Organisation du défi

Arrivez tôt le jour du défi pour disposer les QR Codes. Munissez-vous des QR Codes plastifiés et perforés, de votre feuille de route, de la ficelle et des ciseaux.

Commencez par le site indiqué par le QR Code 0 (détails plus loin dans la feuille de route). Le défi est structuré en boucle, le dernier QR Code pointera donc vers le lieu de départ. Les images dans cette feuille de route indiquent où placer les QR Codes, pas les images révélées par le scan du code.

Fixez chaque QR Code à l'endroit prévu à l'aide de la ficelle et des ciseaux. Pour plus de défi, cachez-les un peu mais gardez le QR Code 1 assez visible pour ne pas augmenter la difficultée trop tôt. Respectez la nature en restant sur le chemin principal. Après avoir installé le QR Code, scannez-le pour vérifier qu'il est correct.

Prévoyez du temps en cas de problèmes inattendus, comme oublier votre matériel ou vous tromper de QR Code. Si vous estimez que le défi prendra 1 heure à pied, arrivez au moins 2 heures à l'avance.

Si un lieu devient inaccessible le jour du défi (travaux, événements, etc.), vous pouvez désactiver le QR Code correspondant depuis le lien du défi. Par exemple, si le lieu du QR Code 5 est inaccessible, désactivez le QR Code 4 et placez le QR Code 5 à l'emplacement du QR Code 4.

<a id="3---excution-du-dfi"></a>
### 3 - Exécution du défi

Formez des équipes. Un membre de chaque équipe créera un nom d'équipe et partagera le lien pour rejoindre l'équipe. Faites-leur scanner le QR Code de l'équipe pour vérifier la compatibilité de leur appareil. Les iPhones peuvent scanner nativement un QR Code.

Une fois les équipes formées, expliquez le fonctionnement du défi. Faites scanner le premier QR Code (qui n'active pas le chrono) comme exemple. Indiquez que la page du QR Code fournit un indice pour trouver le mot caché, et que des essais peuvent être faits sur la page de progression. La liste des QR Codes déjà scannés y est également affichée.

Enfin, expliquez que le chrono démarre avec le scan du deuxième QR Code, et que le défi se termine lorsque tous les QR Codes ont été scannés et le mot trouvé.

### 4 - Foire aux questions

Combien de temps faut-il pour valider un défi ? Lors de la création ou de la mise à jour d'un défi, l'administrateur reçoit un email et le délai de traitement est généralement d'une semaine maximum.

## Installation

### Front

Pour démarrer le front, référez-vous au [README.md du front](./front/README.md) situé dans le dossier front.

### Back

Pour démarrer le back, référez-vous au [README.md du back](./back/README.md) situé dans le dossier back.

<a id="features--raliser"></a>
## Features à réaliser

* Passage des variables globales du localeStorage avec Redux
* Ajouter un bouton de disable/enable d'urgence d'un QR Code dans un défi déjà validé au cas où un lieu de pose de QR Code ne soit pas accessible.
* Limiter le nombre de requêtes pour trouver les mots afin d'éviter trop de spam de réponses
* Faire un tutoriel
* Dockerisation de l'application
