import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {NotificationManager} from "react-notifications";
import {generateQrCode} from "../Pages/createDefiQrCode";

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
                text: "Déroulement du défi",
                tocItem: 'deroulement',
                style: {fontSize: 18, bold: true, alignment: 'center'}
            },
            {text: ' '},  // Ajoute un espace
            {text: '1 - La préparation du défi', style: {bold: true}},
            {text: "Cette étape consiste à aller sur un lieu où l'on souhaite créer le défi et d'aller prendre en photos des lieux potentiels où l'on souhaite placer des QR Codes."},
            {text: "Il est possible que le jour du défi, certains lieux ne soient plus accessibles pour des raisons diverses et variées. Il est donc conseillé de prendre un maximum de photos afin d'avoir un maximum de choix le jour du défi."},
            {text: "Une fois que vous avez votre lot de photos, il faudra vous rendre sur la page de création de défi (" + window.location.origin + "/defi) et de remplir le formulaire de création de défi."},
            {text: "Vous devrez alors attendre que votre défi soit validé par un administrateur avant de pouvoir passer à l'étape suivante."},
            {text: "Une fois que votre défi est validé, vous pourrez télécharger votre feuille de route et imprimer les QR Codes. Attention, si vous souhaitez effectuer une modification sur votre défi, il faudra attendre que votre défi soit à nouveau validé par un administrateur et il ne sera plus disponible pendant ce laps de temps."},
            {text: "Vous devrez alors imprimer les QR Codes situées à la fin de la feuille de route. Puis il faudra les plastifier afin qu'ils puissent résister aux intempéries. Vous pourrez acheter une plastifieuse A4 pour plus ou moins de 10€ sur Leboncoin avec la livraison (https://www.leboncoin.fr/recherche?text=plastifieuse%20A4&price=min-10). Une fois platifié, il faudra faire des trous dans les QR Codes à l'aide d'une perforatrice pour plus ou moins 3€ sur Leboncoin avec la livraison (https://www.leboncoin.fr/recherche?text=perforatrice%20feuille&price=min-3). Cela vous permettra de pouvoir les attacher le jour du défi."},
            {text: ' '},  // Ajoute un espace
            {text: '2 - La mise en place du défi', style: {bold: true}},
            {text: "Le jour du défi, arrivez en avance afin de pouvoir mettre en place les QR Codes (plus de détails plus loin). Il faudra alors vous munir des QR Codes plastifié & perforés, de cette feuille de route sur votre téléphone, de ficelle et d'un ciseau."},
            {text: "Commencez alors à vous rendre sur le lieu indiqué par le QR Code 0 (voir plus bas dans cette feuille de route). Vous devez comprendre que ce défi est une boucle. Par conséquent, le dernier QR Code est censé montrer comme images le lieu de départ du défi. Ainsi dans cette feuille de route, les images indiquent le lieu où doivent être placés les QR Code et non les images qui seront révélés une fois le QR Code scanné. Vous devrez suivre la procédure suivante pour chaque QR Code"},
            {text: "Une fois rendu sur le lieu d'un QR Code à placer, attachez-le à l'endroit que vous avez prévu avec la ficelle et le ciseau pour qu'il ne s'envole pas. Pour que cela soit plus intéressant, placez-le de manière légèrement caché (cependant je vous invite à le rendre assez visible pour le QR Code 1 à trouver afin que les joueurs puissent comprendre d'eux-même ce qu'ils doivent trouver). Pensez aussi à rendre le QR Code accessible, cela doit rester sur le chemin principal afin de ne pas abimer la végétation. Une fois le QR Code posé, scannez-le afin de vérifier qu'il s'agit bien du bon QR Code (vous avez aussi le numéro indiqué sur pages des QR Code d'impression)."},
            {text: "Il pourrait vous arriver plusieurs soucis, lors de la pose des QR Codes. Vous pourriez-vous oublier votre matériel, vous tromper de QR Code lors de la pose ou tout un tas d'autres raison qui pourraient vous faire prendre du retard. C'est pourquoi il est important de bien arriver en avance. En supposant que pour réaliser votre défi à pied, il vous faut 1h, arrivez alors sur le lieu, le double du temps, et donc dans cet exemple au moins 2 heures avant."},
            {text: "Un autre soucis pourrait aussi vous arriver, le jour du défi, il est possible qu'un lieu ne soit plus accessible pour des raisons diverses (lieu en travaux, festival placé sur un QR Code, chemin inaccessible...). Ce cas est prévu, il vous faudra alors vous rendre sur le lien du défi (situé au niveau du Récapitulatif du défi plus bas dans cette feuille de route). Puis de désactiver le QR Code qui indique le lieu inaccessible."},
            {text: "Exemple: Imaginons que le lieu où le QR Code 5 ne soit plus accessible, il vous faudra désactiver le QR Code 4 et placer le QR Code 5 sur le lieu du QR Code 4."},
            {text: ' '},  // Ajoute un espace
            {text: '3 - La réalisation du défi', style: {bold: true}},
            {text: "Il vous faudra constituer plusieurs équipes. Dans chaque équipe un joueur devra créer un nom d'équipe et partager le lien pour rejoindre l'équipe. Le mieux étant de leurs faire scanner le QR Code d'équipe afin de vérifier que chacun arrive à scanner un QR Code avec son appareil. Il faut tout de même noter que les iPhones avec l'appareil photo permet de scanner nativement un QR Code. Une fois scanné ou arrivé sur le lien, il faudra accepter les cookies, ce qui actualisera la page et permettra de rejoindre l'équipe. Il faut noter qu'il n'est nécessaire de scanner un QR Code uniquement pour un seul membre de l'équipe et que cela ne pose pas de problème si le QR Code scanné à nouveau, seul le temps du premier est pris en compte."},
            {text: "Ensuite il faudra expliquer le fonctionnement. Le plus simple sera alors de demander à un membre de chaque équipe de scanner le premier QR Code en précisant que le premier QR Code n'enclenche pas de chrono et est là pour servir d'exemple. Une fois sur la page du QR Code, expliquer que cela donne un indice afin de trouver le mot caché. En profiter pour indiquer que l'on peut entrer des réponses dans la page d'avancement (autant d'essai que l'on souhaite) et voir la liste des QR Codes déjà scannés. Il faudra aussi indiquer que l'on a aussi plusieurs images donnant des informations sur la localisation du prochain QR Code."},
            {text: "Et pour finir, il faudra indiquer que le chrono commence lorsqu'ils auront scanné le second QR Code et que le défi se fini lorsque tout les QR Code auront été scannés et que le mot aura été trouvé."},
            {text: ' '},  // Ajoute un espace
            {text: '4 - Foire Aux Questions', style: {bold: true}},
            {text: "Combien de temps prend la validation d'un défi ? Lorsqu'un défi est créé ou mis à jour, l'administrateur reçoit un e-mail, il faudra alors compter un délai de 1 semaine maximum afin de traiter la demande."},
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
