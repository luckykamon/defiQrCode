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
            style: {fontSize: 12}
        })
    }

    const docDefinition = {
        info: {
            title: 'Feuille de route - ' + dataDefi.defiName,
            creator: 'Lucas BODIN',
            subject: 'Feuille de route pour mettre en place le défi - ' + dataDefi.defiName,
            keywords: 'lucas bodin defi ' + dataDefi.defiName,
        },
        footer: function (currentPage, pageCount) {
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
                style: {fontSize: 12}
            },
            {
                toc: {
                    id: 'recapitulatif'
                },
                style: {fontSize: 12}
            },
            ...tocQrCode,
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
                        ["Mot Caché", {text: dataDefi.motCache, style: {alignment: 'center'}}]
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
                    }).catch((error) => {
                        console.error(error);
                        NotificationManager.error("Une erreur est survenue lors de la génération d'un QR Code, un Qr Code non personnalisé sera alors généré", 'Erreur', 5000);
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
                        text: "Qr Code" + index,
                        tocItem: 'qrCode_' + index,
                        style: {fontSize: 18, bold: true, alignment: 'center'}
                    },
                    {text: ' '},  // Ajoute un espace
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ["Url du Qr Code", {
                                    text: urlQrCode,
                                    link: urlQrCode,
                                    style: {color: '#fe6928', alignment: 'center'}
                                }],
                                ["Indice", {text: indice, style: {alignment: 'center'}}],
                                ["Qr Code", qrCodeObject],
                                ["Placement", imagesTable]
                            ]
                        }
                    }
                ];
            })),
        ],
    };
    pdfMake.createPdf(docDefinition).open();
}
