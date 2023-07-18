import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import {qrcodeSchema} from "../routes/qrcode/qrcode.schema";
import {defiSchema} from "../routes/defi/defi.schema";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;

let isConnected = false;
let inProgressConnection = false;

const insertDefaultData = async () => {
    // Définition des données par défaut
    let defiIds = ["64b66ef1b45f50b48e23eef4", "64b66ef1b45f50b48e23eef5"];
    const defis = [{
        _id: defiIds[0], // Si changement, penser à changer dans le front pour avoir le défi par default
        name: "CÀP 2023",
        description: "Le défi QrCode est une course d'orientation se situant dans le parc des Gayeulles à Rennes.\n" +
            "L'objectif est de réussir à trouver le mot caché en partant du point de départ. Point de départ où il faudra scanner le QrCode permettant d'accéder à un indice du mot caché et contenant plusieurs indices vers le prochain QrCode. Et ainsi de suite... afin de trouver le mot 🎁\n" +
            "Chaque QrCode se situe à moins de 20m maximum du parcours que vous pouvez télécharger ci-dessous.\n" +
            "Cet évènement a eu lieu le 3 juin 2023 avec le groupe facebook Courir à Plusieurs",
        image: {
            path: "/defi/cap_2023/images/carte_parc_gayeulles.jpg",
            alt: "Carte du Parc des Gayeulles"
        },
        fichier: {
            path: "/defi/cap_2023/fichiers/chien_gayeulles.gpx",
            alt: "Fichier gpx du parcours"
        },
        password: process.env.PASSWORD_DEFI,
        motCache: "accord",
        qrCodes: [
            {
                idQrCode: 'etape_0',
                defiId: defiIds[0],
                number: 0,
                indice: 'Exemple',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_0/8he0pIy27Wk8t09nLD0AfhKGaAqdLcM20.jpeg",
                        name: "zoom etape 0"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_0/Gp63JrQctB1mz1jZ6AQ52v5e0u0IiaRZ4.jpeg",
                        name: "dezoom etape 0"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_0/aV5s2kNrDZ6Q4KWx0RrrHg0Y8NBA9whxm.jpeg",
                        name: "panorama etape 0"
                    }
                ]
            },
            {
                idQrCode: 'LYUpKr6Jwp5J',
                defiId: defiIds[0],
                number: 1,
                indice: 'Guitare',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_1/rLuIvhEcQY4GzYQns9n87Kq4epjQ8eVwT.jpeg",
                        name: "zoom etape 1"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_1/c9eg10VSecPncoIhqtpg0QvK096XSVOGs.jpeg",
                        name: "dezoom etape 1"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_1/87lHF6XcGqSzBPmMeTu3Vk0ApfAjTmUVC.jpeg",
                        name: "panorama etape 1"
                    }
                ]
            },
            {
                idQrCode: 'MFCJd5deG2LZ',
                defiId: defiIds[0],
                number: 2,
                indice: 'Verbal',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_2/2J283o0Dgp461m8Zb21yjR46KOyVNfT6I.jpeg",
                        name: "zoom etape 2"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_2/UKPt7g791xNdUV3KVLbCOm59g8imn5j3l.jpeg",
                        name: "dezoom etape 2"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_2/27FBv4ZwZ3VkG8h25caDfbXAlUBc1G7qg.jpeg",
                        name: "panorama etape 2"
                    }
                ]
            },
            {
                idQrCode: 'PLb8tfxH6Ngj',
                defiId: defiIds[0],
                number: 3,
                indice: 'Mineur',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_3/2EnrwH34pwNpF9voxKZB6KJQ372Uu0e3W.jpeg",
                        name: "zoom etape 3"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_3/dscQH17YAvHi2CeS8UkoFgK7OmnJzkj0x.jpeg",
                        name: "dezoom etape 3"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_3/35DQ8V7M52x78ZFRg5pPqPrQtDVK2ylea.jpeg",
                        name: "panorama etape 3"
                    }
                ]
            },
            {
                idQrCode: '4HIQ7L8B1Ppx',
                defiId: defiIds[0],
                number: 4,
                indice: 'Principe',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_4/DpCT5WjB3UhzgvONVwgZ5xn0Z5Qg1kDlV.jpeg",
                        name: "zoom etape 4"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_4/kYC24VzS6MdQ6lTsFTM9fRBzQrwFlwQGa.jpeg",
                        name: "dezoom etape 4"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_4/12jC69SZImHLm5oCM9I4vL6Fe8Gw6Cum6.jpeg",
                        name: "panorama etape 4"
                    }
                ]
            },
            {
                idQrCode: 'DcB423kQ8MW2',
                defiId: defiIds[0],
                number: 5,
                indice: 'Verbe',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_5/9ztRxxO4p2ZA6HlopUwxSCXcmqCAg8mC5.jpeg",
                        name: "zoom etape 5"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_5/BNKepz49Bj4swM1z8vbpX2tZDhCB2a0VH.jpeg",
                        name: "dezoom etape 5"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_5/tbuu0WaWcMAjv6D8PmkJcBsN3U1hLUC1b.jpeg",
                        name: "panorama etape 5"
                    }
                ]
            },
            {
                idQrCode: 'Z2pkN69lkPTC',
                defiId: defiIds[0],
                number: 6,
                indice: 'Signature',
                date: null,
                equipeId: null,
                isSolution: true,
                listImage: [
                    {
                        path: "/defi/cap_2023/images/parcours/etape_6/YGr3zcYG9zVUM6R3eOER16yF16UeYIfqb.jpeg",
                        name: "zoom etape 6"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_6/7HHfeOkhDgsX8uL2jgSLIswklJ4YG8jwT.jpeg",
                        name: "dezoom etape 6"
                    },
                    {
                        path: "/defi/cap_2023/images/parcours/etape_6/BzM67Nxr12g82n5DWLHrEwC3UKotE2zj2.jpeg",
                        name: "panorama etape 6"
                    }
                ]
            }
        ]
    }, {
        _id: defiIds[1],
        name: "CÀP 2022",
        description: "Le défi QrCode est une course d'orientation se situant dans le parc des Gayeulles à Rennes.\n" +
            "L'objectif est de réussir à trouver la phrase caché en partant du point de départ (cliquez ici). Point de départ où il faudra scanner le QrCode permettant d'accéder à un indice du mot caché et contenant plusieurs indices vers le prochain QrCode. Et ainsi de suite... afin de trouver le mot 🎁\n" +
            "Chaque QrCode se situe à moins de 20m maximum du parcours que vous pouvez télécharger ci-dessous.\n" +
            "Cet évènement a eu lieu le 3 juin 2023 avec le groupe facebook Courir à Plusieurs",
        image: {
            path: "/defi/cap_2023/images/carte_parc_gayeulles.jpg", // Même image en 2022 & 2023
            alt: "Carte du Parc des Gayeulles"
        },
        fichier: {
            path: "/defi/cap_2023/fichiers/chien_gayeulles.gpx", // Même fichier en 2022 & 2023
            alt: "Fichier gpx du parcours"
        },
        password: process.env.PASSWORD_DEFI,
        motCache: "Les capains font la fete toute la soiree aux Gayeulles en chantant.",
        qrCodes: [{
            idQrCode: 'etape_0',
            defiId: defiIds[1],
            number: 0,
            indice: 'Les',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_0/FDE5DFA0-60BA-450C-820F-EC43F440848B_1_105_c.jpeg",
                    name: "zoom etape 0"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_0/E3A426AF-358D-4F7A-842E-7662E5D8B0FA_1_105_c.jpeg",
                    name: "dezoom etape 0"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_0/22E4D739-56E2-4BC6-A03B-CDADFB1DACEA_1_105_c.jpeg",
                    name: "panorama etape 0"
                }
            ]
        }, {
            idQrCode: 'nq20CjprDksS',
            defiId: defiIds[1],
            number: 1,
            indice: 'capains',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_1/80BE8BBD-031E-4065-83BB-EB480D3C2E5F_1_105_c.jpeg",
                    name: "zoom etape 1"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_1/FB2AC173-6E2F-4C48-8312-DD413F1B26C8_1_105_c.jpeg",
                    name: "dezoom etape 1"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_1/7FFDB2E3-04F6-4C44-B79D-0C744C419F3C_1_102_o.jpeg",
                    name: "panorama etape 1"
                }
            ]
        }, {
            idQrCode: 'U6BeT2kldxeY',
            defiId: defiIds[1],
            number: 2,
            indice: 'font',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_2/1ED7E006-AD41-422A-A64A-A3774E3A0E30_1_105_c.jpeg",
                    name: "croisement etape 2"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_2/4B44CCB1-061F-4168-902F-680E62584DAF_1_105_c.jpeg",
                    name: "zoom etape 2"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_2/1916CCE0-FD56-42FB-9C77-DDBA969B90BC_1_105_c.jpeg",
                    name: "dezoom etape 2"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_2/D36F9E81-712D-4D56-9E41-7A588FDFD8D5_1_105_c.jpeg",
                    name: "panorama etape 2"
                }
            ]
        }, {
            idQrCode: 'ZFw1bKuekyNl',
            defiId: defiIds[1],
            number: 3,
            indice: 'la',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_3/15D01B24-AFC9-46DE-A2BD-7B22617B1B37_1_105_c.jpeg",
                    name: "zoom etape 3"
                }
            ]
        }, {
            idQrCode: 'lBVt7ypM5oPa',
            defiId: defiIds[1],
            number: 4,
            indice: 'fete',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_4/1B5A35D6-BDC4-42ED-B35F-70D2AFF9407B_1_105_c.jpeg",
                    name: "chemin etape 4"
                }, {
                    path: "/defi/cap_2022/images/parcours/etape_4/8B4E6207-46D8-4F6A-95E7-39A7E5B6B9CA_1_105_c.jpeg",
                    name: "zoom etape 4"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_4/C33809CA-232C-405F-B9DB-15E1E6BEFEC4_1_105_c.jpeg",
                    name: "dezoom etape 4"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_4/173FBFA8-DC33-42C1-9D94-573A50810A30_1_105_c.jpeg",
                    name: "panorama etape 4"
                }
            ]
        }, {
            idQrCode: 'Gnbo5WHSB20C',
            defiId: defiIds[1],
            number: 5,
            indice: 'toute',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_5/5D4D49E8-112E-4364-BB8A-4C2849DA96ED_1_105_c.jpeg",
                    name: "zoom etape 5"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_5/008CFB4E-704C-47A9-AD61-EA8D51BCE951_1_105_c.jpeg",
                    name: "dezoom etape 5"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_5/362A1544-DB4F-4C17-ABE9-72F4C799B898_1_102_o.jpeg",
                    name: "panorama etape 5"
                }
            ]
        }, {
            idQrCode: 'qQdbfyALH9Nz',
            defiId: defiIds[1],
            number: 6,
            indice: 'la',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_6/1204A17A-684D-4872-A324-9A122BB4A0E3_1_105_c.jpeg",
                    name: "zoom etape 6"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_6/4E330359-A744-40B4-9124-E8552D6C8D91_1_105_c.jpeg",
                    name: "dezoom etape 6"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_6/86D9126E-1F15-4EC3-818C-A779AD493728_1_105_c.jpeg",
                    name: "panorama etape 6"
                }
            ]
        }, {
            idQrCode: 'q7ZqAEY7nqYQ',
            defiId: defiIds[1],
            number: 7,
            indice: 'soiree',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_7/58B6E235-13F8-4106-AE90-1DFF8ECA2620_1_105_c.jpeg",
                    name: "zoom etape 7"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_7/79C223EC-E947-4E50-86E6-954C03D62562_1_105_c.jpeg",
                    name: "dezoom etape 7"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_7/36A852AA-7847-4804-87A3-D9582910478E_1_105_c.jpeg",
                    name: "panorama etape 7"
                }
            ]
        }, {
            idQrCode: '96vSXCMPHfVZ',
            defiId: defiIds[1],
            number: 8,
            indice: 'aux',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_8/F49F93D0-1093-4CDF-BE21-5236A1F09DD7_1_105_c.jpeg",
                    name: "zoom etape 8"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_8/3D61F847-B7BA-48AB-A93D-CAF0CC69B73D_1_105_c.jpeg",
                    name: "dezoom etape 8"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_8/02AD2484-C3CF-4D57-AD42-0CC7C8129040_1_105_c.jpeg",
                    name: "panorama etape 8"
                }
            ]
        }, {
            idQrCode: 'e8EP7hPTDgYT',
            defiId: defiIds[1],
            number: 9,
            indice: 'Gayeulles',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_9/9CE83EF6-9770-4194-9C81-81D5A8B9056C_1_105_c.jpeg",
                    name: "zoom etape 9"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_9/7C231ACC-CCEE-485A-99E3-68CE93C5D7FB_1_105_c.jpeg",
                    name: "dezoom etape 9"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_9/EEB89395-F94B-4359-B9BC-CDBC067E09B0_1_105_c.jpeg",
                    name: "panorama etape 9"
                }
            ]
        }, {
            idQrCode: '2dntPyEx7Et9',
            defiId: defiIds[1],
            number: 10,
            indice: 'en',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_10/1BA39F21-41B1-4584-A397-70ED6B71D064_1_105_c.jpeg",
                    name: "zoom etape 10"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_10/3D7A6604-3961-4C5C-BF00-515015053782_1_105_c.jpeg",
                    name: "dezoom etape 10"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_10/EA3CBFC0-3431-48AF-980C-0B25CE834F8F_1_105_c.jpeg",
                    name: "panorama etape 10"
                }
            ]
        }, {
            idQrCode: 'ezMyOYo0X2De',
            defiId: defiIds[1],
            number: 11,
            indice: 'chantant.',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/defi/cap_2022/images/parcours/etape_11/EE5743D6-B37F-4902-89A9-98922FF892B1_1_105_c.jpeg",
                    name: "zoom etape 11"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_11/532E22C2-460B-4BE9-8526-371B9C2684A6_1_105_c.jpeg",
                    name: "dezoom etape 11"
                },
                {
                    path: "/defi/cap_2022/images/parcours/etape_11/40666D37-CE86-4311-8D8B-F00DDBD8CEE3_1_105_c.jpeg",
                    name: "panorama etape 11"
                }
            ]
        }]
    }];

    for (const defi of defis) {
        // On supprime tous les QrCodes et les défis qui auraient pu être créé avant correspondant au défi CÀP 2023 (afin de mettre à jour par la suite et éviter les doublons)
        await defiSchema.find({name: defi.name})
            .then(async (defisToBeDelete) => {
                let tasks = [];
                for (const defiToBeDelete of defisToBeDelete) {
                    tasks.push(
                        qrcodeSchema.deleteMany({defiId: defiToBeDelete._id}),
                        defiSchema.deleteOne({_id: defiToBeDelete._id})
                    );
                }
                await Promise.all(tasks);
            });

        await defiSchema.create(defi)
            .then(async () => {
                let tasks2: Promise<any>[] = [];
                defi.qrCodes.forEach(defaultQrCode => {
                    tasks2.push(
                        qrcodeSchema.create(defaultQrCode).catch(error => console.log(error))
                    );
                });
                await Promise.all(tasks2);
            });
    }


};

export const connect = async () => {
    try {
        if (isConnected) return true; // Si déjà connecté, on ne fait rien

        // Permet d'éviter que 2 connexions soient lancées en même temps
        let nbTry = 0;
        while (inProgressConnection && nbTry < 50) {
            nbTry++;
            await new Promise(resolve => setTimeout(resolve, 200));
        }

        if (nbTry !== 0) {
            return isConnected;
        }

        inProgressConnection = true;
        process.stdout.write("Trying to connect to database ");
        await Mongoose.connect(mongoUri);
        isConnected = true;
        process.stdout.write("→ OK ");
        process.stdout.write("→ Trying to insert default data ");
        await insertDefaultData();
        inProgressConnection = false;
        process.stdout.write("→ OK\n");

        return true;
    } catch (error) {
        console.log('Error while trying to connect to database or insert default data => ' + error);
        return false;
    }
};
