import Mongoose from 'mongoose';
import dotenv from 'dotenv';
import {qrcodeSchema} from "../routes/qrcode/qrcode.schema";

dotenv.config();

const mongoUri = process.env.MONGO_URI as string;

let isConnected = false;

const insertDefaultData = async () => {
    // Définition des données par défaut
    const defaultData = [
        {
            idQrCode: 'etape_0',
            number: 0,
            indice: 'Exemple',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_0/8he0pIy27Wk8t09nLD0AfhKGaAqdLcM20.jpeg",
                    alt: "zoom etape 0"
                },
                {
                    path: "/images/parcours/etape_0/Gp63JrQctB1mz1jZ6AQ52v5e0u0IiaRZ4.jpeg",
                    alt: "dezoom etape 0"
                },
                {
                    path: "/images/parcours/etape_0/aV5s2kNrDZ6Q4KWx0RrrHg0Y8NBA9whxm.jpeg",
                    alt: "panorama etape 0"
                }
            ]
        },
        {
            idQrCode: 'LYUpKr6Jwp5J',
            number: 1,
            indice: 'Guitare',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_1/rLuIvhEcQY4GzYQns9n87Kq4epjQ8eVwT.jpeg",
                    alt: "zoom etape 1"
                },
                {
                    path: "/images/parcours/etape_1/c9eg10VSecPncoIhqtpg0QvK096XSVOGs.jpeg",
                    alt: "dezoom etape 1"
                },
                {
                    path: "/images/parcours/etape_1/87lHF6XcGqSzBPmMeTu3Vk0ApfAjTmUVC.jpeg",
                    alt: "panorama etape 1"
                }
            ]
        },
        {
            idQrCode: 'MFCJd5deG2LZ',
            number: 2,
            indice: 'Verbal',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_2/2J283o0Dgp461m8Zb21yjR46KOyVNfT6I.jpeg",
                    alt: "zoom etape 2"
                },
                {
                    path: "/images/parcours/etape_2/UKPt7g791xNdUV3KVLbCOm59g8imn5j3l.jpeg",
                    alt: "dezoom etape 2"
                },
                {
                    path: "/images/parcours/etape_2/27FBv4ZwZ3VkG8h25caDfbXAlUBc1G7qg.jpeg",
                    alt: "panorama etape 2"
                }
            ]
        },
        {
            idQrCode: 'PLb8tfxH6Ngj',
            number: 3,
            indice: 'Mineur',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_3/2EnrwH34pwNpF9voxKZB6KJQ372Uu0e3W.jpeg",
                    alt: "zoom etape 3"
                },
                {
                    path: "/images/parcours/etape_3/dscQH17YAvHi2CeS8UkoFgK7OmnJzkj0x.jpeg",
                    alt: "dezoom etape 3"
                },
                {
                    path: "/images/parcours/etape_3/35DQ8V7M52x78ZFRg5pPqPrQtDVK2ylea.jpeg",
                    alt: "panorama etape 3"
                }
            ]
        },
        {
            idQrCode: '4HIQ7L8B1Ppx',
            number: 4,
            indice: 'Principe',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_4/DpCT5WjB3UhzgvONVwgZ5xn0Z5Qg1kDlV.jpeg",
                    alt: "zoom etape 4"
                },
                {
                    path: "/images/parcours/etape_4/kYC24VzS6MdQ6lTsFTM9fRBzQrwFlwQGa.jpeg",
                    alt: "dezoom etape 4"
                },
                {
                    path: "/images/parcours/etape_4/12jC69SZImHLm5oCM9I4vL6Fe8Gw6Cum6.jpeg",
                    alt: "panorama etape 4"
                }
            ]
        },
        {
            idQrCode: 'DcB423kQ8MW2',
            number: 5,
            indice: 'Verbe',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_5/9ztRxxO4p2ZA6HlopUwxSCXcmqCAg8mC5.jpeg",
                    alt: "zoom etape 5"
                },
                {
                    path: "/images/parcours/etape_5/BNKepz49Bj4swM1z8vbpX2tZDhCB2a0VH.jpeg",
                    alt: "dezoom etape 5"
                },
                {
                    path: "/images/parcours/etape_5/tbuu0WaWcMAjv6D8PmkJcBsN3U1hLUC1b.jpeg",
                    alt: "panorama etape 5"
                }
            ]
        },
        {
            idQrCode: 'Z2pkN69lkPTC',
            number: 6,
            indice: 'Signature',
            date: null,
            equipeId: null,
            isSolution: true,
            listImage: [
                {
                    path: "/images/parcours/etape_6/YGr3zcYG9zVUM6R3eOER16yF16UeYIfqb.jpeg",
                    alt: "zoom etape 6"
                },
                {
                    path: "/images/parcours/etape_6/7HHfeOkhDgsX8uL2jgSLIswklJ4YG8jwT.jpeg",
                    alt: "dezoom etape 6"
                },
                {
                    path: "/images/parcours/etape_6/BzM67Nxr12g82n5DWLHrEwC3UKotE2zj2.jpeg",
                    alt: "panorama etape 6"
                }
            ]
        }

    ];

    let nbDataInsert = 0;
    let nbDataRenew = 0;

    defaultData.forEach(defaultQrCode => {
        qrcodeSchema.findOneAndDelete({idQrCode: defaultQrCode.idQrCode, isSolution: true})
            .then(doc => {
                qrcodeSchema.create(defaultQrCode)
                    .then(() => {
                        if (doc) {
                            nbDataRenew += 1;
                        } else {
                            nbDataInsert += 1;
                        }
                        if (nbDataInsert + nbDataRenew === defaultData.length) {
                            console.log(`Default data inserted : ${nbDataInsert} | Default data renewed : ${nbDataRenew}`);
                        }
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    });


}

export const connect = async () => {
    try {
        if (isConnected) return true;

        console.log('Trying to connect to database...');
        await Mongoose.connect(mongoUri);
        isConnected = true;
        console.log("Connected to database → OK")

        await insertDefaultData();

        return true;
    } catch (error) {
        console.log('Error while trying to connect to database => ' + error);
        return false;
    }
}
