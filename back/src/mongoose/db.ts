import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import {qrcodeSchema} from "../routes/qrcode/qrcode.schema";
import {defiSchema} from "../routes/defi/defi.schema";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;

let isConnected = false;

const insertDefaultData = async () => {
    // Définition des données par défaut
    const defaultData = (defiId: string) => {
        return ([
                {
                    idQrCode: 'etape_0',
                    defiId: defiId,
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
                    defiId: defiId,
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
                    defiId: defiId,
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
                    defiId: defiId,
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
                    defiId: defiId,
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
                    defiId: defiId,
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
                    defiId: defiId,
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
        );
    };

    const nameDefiCap2023 = "CÀP 2023";
    const defi = {
        _id: "64b66ef1b45f50b48e23eef4", // Si changement, penser à changer dans le front pour avoir le défi par default
        name: nameDefiCap2023,
        description: "Le défi QrCode est une course d'orientation se situant dans le parc des Gayeulles à Rennes.\n" +
            "L'objectif est de réussir à trouver le mot caché en partant du point de départ (cliquez ici). Point de départ où il faudra scanner le QrCode permettant d'accéder à un indice du mot caché et contenant plusieurs indices vers le prochain QrCode. Et ainsi de suite... afin de trouver le mot 🎁\n" +
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
        motCache: "accord"
    };

    // On supprime tous les QrCodes et les défis qui auraient pu être créé avant correspondant au défi CÀP 2023 (afin de mettre à jour par la suite et éviter les doublons)
    await defiSchema.find({name: nameDefiCap2023})
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
        .then(async (defiResult) => {
            let tasks2: Promise<any>[] = [];
            defaultData(defiResult._id.toString()).forEach(defaultQrCode => {
                tasks2.push(
                    qrcodeSchema.create(defaultQrCode).catch(error => console.log(error))
                );
            });
            await Promise.all(tasks2);
        });


};

export const connect = async () => {
    try {
        if (isConnected) return true;

        console.log('Trying to connect to database...');
        await Mongoose.connect(mongoUri);
        isConnected = true;
        console.log("Connected to database → OK");

        await insertDefaultData();

        return true;
    } catch (error) {
        console.log('Error while trying to connect to database => ' + error);
        return false;
    }
};
