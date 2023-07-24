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

    const docDefinition = {
        content: [
            {text: "Feuille de route: " + dataDefi.defiName, style: {fontSize: 20, bold: true, alignment: 'center'}},
            {text: ' '},  // Ajoute un espace
            {
                table: {
                    widths: ['auto', '*'],
                    body: [
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

                let urlQrCodeImage = "";

                await generateQrCode({
                    color: '#000000',
                    text: idQrCode,
                    fileUrl: process.env.REACT_APP_URL_BACK + dataDefi.image
                }).then((nameQrCode: string) => {
                    urlQrCodeImage = process.env.REACT_APP_URL_QRCODE + "/getQrCode/" + nameQrCode;
                }).catch((error) => {
                    console.error(error);
                    NotificationManager.error('Une erreur est survenue lors de la génération du QR Code', 'Erreur', 5000);
                });

                const qrCodeImage = await getImageData(urlQrCodeImage);

                return [
                    {text: '', pageBreak: 'after'}, // Saut de page
                    {text: "Qr Code" + index, style: {fontSize: 18, bold: true, alignment: 'center'}},
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
                                ["Qr Code", {image: qrCodeImage, width: 300, style: {alignment: 'center'}}],
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
