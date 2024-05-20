
import {NotificationManager} from "react-notifications";
import {generateQrCode} from "../Pages/createDefiQrCode";
import pdfMake from "pdfmake/build/pdfmake.min";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;



// Ouvrir le PDF dans une nouvelle fenêtre
export const createPdfDefi = async (dataDefi: {
    defiName: string, motCache: string, image: string | null, description: string, file: string | null, steps: Array<{
        idQrCode: string,
        indice: string,
        images: Array<string>,
    }>
}) => {
    // Le dernier QrCode doit rediriger vers le premier QrCode, donc le dernier élément de la liste correspond à l'emplacement où le premier QrCode doit être placé
    const lastElement = dataDefi.steps.pop();
    dataDefi.steps.unshift(lastElement);

    async function getImageData(url) {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    const dataDefiImageUrl = process.env.REACT_APP_URL_BACK + dataDefi.image;
    const dataDefiImage = await getImageData(dataDefiImageUrl);

    const tocQrCode = []

    for (let nbStep = 0; nbStep < dataDefi.steps.length; nbStep++) {
        tocQrCode.push({
            toc: {id: 'qrCode_' + nbStep},
            style: {fontSize: 12},
            margin: [20, 0, 0, 0]
        })
    }

    function rotateImage(data, rotationAngle): Promise<string> {
        return new Promise((resolve, reject) => {
            // Créer une nouvelle image
            const img = new Image();
            img.src = data;

            img.onload = () => {
                // Créer un canvas
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                // Définir les dimensions du canvas en fonction de l'angle de rotation
                if (rotationAngle === 90 || rotationAngle === 270) {
                    canvas.width = img.height;
                    canvas.height = img.width;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }

                // Déplacer l'origine au centre du canvas
                ctx.translate(canvas.width / 2, canvas.height / 2);

                // Effectuer la rotation
                ctx.rotate(rotationAngle * Math.PI / 180);

                // Dessiner l'image
                ctx.drawImage(img, -img.width / 2, -img.height / 2);

                // Récupérer l'image sous forme de data URL
                resolve(canvas.toDataURL().toString());
            };

            img.onerror = reject;
        });
    }


    const imageQrCodes = []

    const docDefinition = {
        info: {
            title: 'Feuille de route - ' + dataDefi.defiName,
            creator: 'Lucas BODIN',
            subject: 'Feuille de route pour mettre en place le défi - ' + dataDefi.defiName,
            keywords: 'lucas bodin defi ' + dataDefi.defiName,
        },
        footer: function (currentPage, pageCount) {
            if (pageCount - currentPage < dataDefi.steps.length) { // On supprime la pagination pour l'impression des QR Codes
                return null;
            }
            return {
                text: currentPage.toString() + ' / ' + pageCount,
                alignment: 'center'
            };
        },
        content: [
            {text: '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n'},  // Ajoute un espace
            {text: "Feuille de route: " + dataDefi.defiName, style: {fontSize: 20, bold: true, alignment: 'center'}},
            {text: ' '},  // Ajoute un espace
            {image: dataDefiImage, width: 100, style: {alignment: 'center'}},
            {text: '', pageBreak: 'after'}, // Saut de page
            {text: "Sommaire", tocItem: 'sommaire', style: {fontSize: 18, bold: true, alignment: 'center'}},
            {text: ' '},  // Ajoute un espace
            {
                toc: {
                    id: 'sommaire',
                },
                style: {fontSize: 12, bold: true}
            },
            {
                toc: {
                    id: 'deroulement',
                },
                style: {fontSize: 12, bold: true}
            },
            {
                toc: {
                    id: 'recapitulatif'
                },
                style: {fontSize: 12, bold: true}
            },
            {text: 'QR Codes', bold: true},
            ...tocQrCode,
            {
                toc: {
                    id: 'impression'
                },
                style: {fontSize: 12, bold: true}
            },
            {text: '', pageBreak: 'after'}, // Saut de page
            {
                text: "Guide du défi",
                tocItem: 'deroulement',
                style: {fontSize: 18, bold: true, alignment: 'center'}
            },
            {text: ' '},  // Ajoute un espace
            {text: '1 - Préparation du défi', style: {bold: true}},
            {text: "La première étape consiste à sélectionner un emplacement approprié pour votre défi. Photographiez plusieurs endroits potentiels pour placer des QR Codes."},
            {text: "Certains emplacements peuvent devenir inaccessibles pour diverses raisons. Avoir plusieurs options vous garantit un maximum de flexibilité."},
            {text: "Après avoir fait votre sélection, afin de soumettre votre proposition, rendez-vous sur la page de création de défi:"},
            {
                text: window.location.origin + "/defi",
                link: window.location.origin + "/defi",
                style: {color: '#fe6928'}
            },
            {text: "Une fois approuvée par un administrateur, vous pourrez télécharger votre feuille de route et imprimer les QR Codes. Si vous apportez des modifications, le défi sera temporairement indisponible jusqu'à nouvelle approbation."},
            {text: "Vous devez ensuite imprimer et plastifier les QR Codes pour les protéger contre les intempéries. Vous pouvez trouver une plastifieuse A4 à un prix abordable sur Leboncoin:"},
            {
                text: "https://www.leboncoin.fr/recherche?text=plastifieuse%20A4&price=min-10",
                link: "https://www.leboncoin.fr/recherche?text=plastifieuse%20A4&price=min-10",
                style: {color: '#fe6928'}
            },
            {text: "Perforez ensuite les QR Codes plastifiés pour pouvoir les attacher le jour du défi. Vous pouvez trouver une perforatrice à un prix abordable sur Leboncoin:"},
            {
                text: "https://www.leboncoin.fr/recherche?text=perforatrice%20feuille&price=min-3",
                link: "https://www.leboncoin.fr/recherche?text=perforatrice%20feuille&price=min-3",
                style: {color: '#fe6928'}
            },
            {text: ' '},  // Ajoute un espace
            {text: '2 - Organisation du défi', style: {bold: true}},
            {text: "Arrivez tôt le jour du défi pour disposer les QR Codes. Munissez-vous des QR Codes plastifiés et perforés, de votre feuille de route, de la ficelle et des ciseaux."},
            {text: "Commencez par le site indiqué par le QR Code 0 (détails plus loin dans la feuille de route). Le défi est structuré en boucle, le dernier QR Code pointera donc vers le lieu de départ. Les images dans cette feuille de route indiquent où placer les QR Codes, pas les images révélées par le scan du code."},
            {text: "Fixez chaque QR Code à l'endroit prévu à l'aide de la ficelle et des ciseaux. Pour plus de défi, cachez-les un peu mais gardez le QR Code 1 assez visible pour ne pas augmenter la difficultée trop tôt. Respectez la nature en restant sur le chemin principal. Après avoir installé le QR Code, scannez-le pour vérifier qu'il est correct."},
            {text: "Prévoyez du temps en cas de problèmes inattendus, comme oublier votre matériel ou vous tromper de QR Code. Si vous estimez que le défi prendra 1 heure à pied, arrivez au moins 2 heures à l'avance."},
            {text: "Si un lieu devient inaccessible le jour du défi (travaux, événements, etc.), vous pouvez désactiver le QR Code correspondant depuis le lien du défi. Par exemple, si le lieu du QR Code 5 est inaccessible, désactivez le QR Code 4 et placez le QR Code 5 à l'emplacement du QR Code 4."},
            {text: ' '},
            {text: '3 - Exécution du défi', style: {bold: true}},
            {text: "Formez des équipes. Un membre de chaque équipe créera un nom d'équipe et partagera le lien pour rejoindre l'équipe. Faites-leur scanner le QR Code de l'équipe pour vérifier la compatibilité de leur appareil. Les iPhones peuvent scanner nativement un QR Code."},
            {text: "Une fois les équipes formées, expliquez le fonctionnement du défi. Faites scanner le premier QR Code (qui n'active pas le chrono) comme exemple. Indiquez que la page du QR Code fournit un indice pour trouver le mot caché, et que des essais peuvent être faits sur la page de progression. La liste des QR Codes déjà scannés y est également affichée."},
            {text: "Enfin, expliquez que le chrono démarre avec le scan du deuxième QR Code, et que le défi se termine lorsque tous les QR Codes ont été scannés et le mot trouvé."},
            {text: ' '},
            {text: '4 - Foire aux questions', style: {bold: true}},
            {text: "Combien de temps faut-il pour valider un défi ? Lors de la création ou de la mise à jour d'un défi, l'administrateur reçoit un email et le délai de traitement est généralement d'une semaine maximum."},
            {text: '', pageBreak: 'after'}, // Saut de page
            {
                text: "Récapitulatif du défi",
                tocItem: 'recapitulatif',
                style: {fontSize: 18, bold: true, alignment: 'center'}
            },
            {text: ' '},  // Ajoute un espace
            {
                table: {
                    widths: ['auto', '*'],
                    body: [
                        ["Lien Défi", {
                            text: window.location.href,
                            link: window.location.href,
                            style: {color: '#fe6928', alignment: 'center'}
                        }],
                        ["Logo", {image: dataDefiImage, width: 100, style: {alignment: 'center'}}],
                        ["Description", dataDefi.description],
                        ["Mot Caché", {text: dataDefi.motCache, style: {alignment: 'center'}}],
                        ["Fichier", {
                            text: process.env.REACT_APP_URL_BACK + dataDefi.file,
                            link: process.env.REACT_APP_URL_BACK + dataDefi.file,
                            style: {color: '#fe6928', alignment: 'center'}
                        }]
                    ]
                }
            },
            // Ajouter les qrCodes au document
            ...await Promise.all(dataDefi.steps.map(async (qrCode, index) => {
                const imagesTable = [];
                for (let i = 0; i < qrCode.images.length; i++) {
                    const imageUrl = process.env.REACT_APP_URL_BACK + qrCode.images[i];
                    const imageData = await getImageData(imageUrl);

                    imagesTable.push({image: imageData, width: 250, style: {alignment: 'center'}});
                }

                let indice;
                let idQrCode;
                if (index + 1 === dataDefi.steps.length) {
                    indice = dataDefi.steps[0].indice
                    idQrCode = dataDefi.steps[0].idQrCode
                } else {
                    indice = dataDefi.steps[index + 1].indice
                    idQrCode = dataDefi.steps[index + 1].idQrCode
                }

                const urlQrCode = window.location.origin + "/" + idQrCode

                let urlQrCodeImage = undefined;
                let qrCodeImage = undefined;
                await generateQrCode({
                    color: '#000000',
                    text: idQrCode,
                    fileUrl: process.env.REACT_APP_URL_BACK + dataDefi.image
                })
                    .then(async (nameQrCode: string) => {
                        urlQrCodeImage = process.env.REACT_APP_URL_QRCODE + "/getQrCode/" + nameQrCode;
                        qrCodeImage = await getImageData(urlQrCodeImage);
                        imageQrCodes.push({number: index, image: qrCodeImage});
                    }).catch((error) => {
                        console.error(error);
                        NotificationManager.error("Une erreur est survenue lors de la génération d'un QR Code, un QR Code non personnalisé sera alors généré", 'Erreur', 5000);
                    });


                let qrCodeObject
                if (urlQrCodeImage !== undefined && qrCodeImage !== undefined) {
                    qrCodeObject = {image: qrCodeImage, width: 300, style: {alignment: 'center'}}
                } else {
                    qrCodeObject = {qr: window.location.origin + "/" + idQrCode, style: {alignment: 'center'}}
                }

                return [
                    {text: '', pageBreak: 'after'}, // Saut de page
                    {
                        text: "QR Code " + index,
                        tocItem: 'qrCode_' + index,
                        style: {fontSize: 18, bold: true, alignment: 'center'}
                    },
                    {text: ' '},  // Ajoute un espace
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ["Url du QR Code", {
                                    text: urlQrCode,
                                    link: urlQrCode,
                                    style: {color: '#fe6928', alignment: 'center'}
                                }],
                                ["Indice", {text: indice, style: {alignment: 'center'}}],
                                ["QR Code", qrCodeObject],
                                ["Images où placer le QR Code", imagesTable]
                            ]
                        }
                    }
                ];
            })),
            {text: '', pageBreak: 'after'}, // Saut de page
            {
                text: "Impression QR Codes",
                tocItem: 'impression',
                style: {fontSize: 18, bold: true, alignment: 'center'}
            },
            {text: ' '},  // Ajoute un espace
            {text: "Pour l'impression des QR Codes, il est conseillé d'imprimer les QR Codes sur une feuille A4. Sur chaque page, il est indiqué le numéro de chaque QR Code ce qui vous servira lorsque vous les placerez."},
            ...await Promise.all(imageQrCodes.sort((a, b) => a.number - b.number).map(async (qrCodeImageObject, index) => {
                let qrCodeImageRotated = qrCodeImageObject.image;
                await rotateImage(qrCodeImageRotated, 90)
                    .then((dataRotate) => {
                        qrCodeImageRotated = dataRotate
                    })
                return ([
                    {text: '', pageBreak: 'after'}, // Saut de page
                    {text: index},
                    {text: '\n\n\n\n\n'},
                    {image: qrCodeImageRotated, width: 600, style: {alignment: 'center'}}
                ])
            }))
        ],
    };
    pdfMake.createPdf(docDefinition).open();
}
