import pdfMake from "pdfmake/build/pdfmake";
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
                for (let i = 0; i < qrCode.images.length; i += 2) {
                    const imageUrl1 = process.env.REACT_APP_URL_BACK + qrCode.images[i];
                    const imageData1 = await getImageData(imageUrl1);
                    const cell1 = {image: imageData1, width: 250};

                    let cell2; // Déclaration sans valeur initiale

                    if (i + 1 < qrCode.images.length) {
                        const imageUrl2 = process.env.REACT_APP_URL_BACK + qrCode.images[i + 1];
                        const imageData2 = await getImageData(imageUrl2);
                        cell2 = {image: imageData2, width: 250}; // Assignation de la valeur
                    } else {
                        cell2 = {text: '', border: [false, false, false, false]}; // Cellule vide par défaut
                    }

                    imagesTable.push([cell1, cell2]);
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

                return [
                    {text: '', pageBreak: 'after'}, // Saut de page
                    {text: "Qr Code" + index, style: {fontSize: 18, bold: true, alignment: 'center'}},
                    {text: ' '},  // Ajoute un espace
                    {
                        table: {
                            widths: ['auto', '*'],
                            body: [
                                ["Url du Qr Code", {text: urlQrCode, link: urlQrCode, style: {color: '#fe6928', alignment: 'center'}}],
                                ["Indice", {text: indice, style: {alignment: 'center'}}]
                            ]
                        }
                    },
                    {text: ' '},  // Ajoute un espace
                    {text: `Vous devez placer le Qr Code ici:`},
                    {
                        table: {
                            widths: ['*', '*'],
                            body: imagesTable
                        },
                        layout: 'noBorders'
                    },
                ];
            })),
        ],
    };
    pdfMake.createPdf(docDefinition).open();
}
