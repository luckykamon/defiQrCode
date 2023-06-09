import React, {FC} from 'react';
import Etape from "../Pages/AffichageEtape"
import Image from "./Image";

const Etape0: FC = () => {
    return (
        <Etape nbQrCode={0} mot={"Exemple"} hideFooter> <Image
            src={"/images/parcours/etape_0/8he0pIy27Wk8t09nLD0AfhKGaAqdLcM20.jpeg"} alt={"zoom etape 0"}/> <Image
            src={"/images/parcours/etape_0/Gp63JrQctB1mz1jZ6AQ52v5e0u0IiaRZ4.jpeg"} alt={"dezoom etape 0"}/> <Image
            src={"/images/parcours/etape_0/aV5s2kNrDZ6Q4KWx0RrrHg0Y8NBA9whxm.jpeg"} alt={"panorama etape 0"}
            lazy={true}/> </Etape>
    )
}

// VERBAL / MINEUR / PRINCIPE / VERBE / SIGNATURE

const Etape1: FC = () => {
    return (
        <Etape nbQrCode={1} mot={"Guitare"}> <Image
            src={"/images/parcours/etape_1/rLuIvhEcQY4GzYQns9n87Kq4epjQ8eVwT.jpeg"} alt={"zoom etape 1"}/> <Image
            src={"/images/parcours/etape_1/c9eg10VSecPncoIhqtpg0QvK096XSVOGs.jpeg"} alt={"dezoom etape 1"}/> <Image
            src={"/images/parcours/etape_1/87lHF6XcGqSzBPmMeTu3Vk0ApfAjTmUVC.jpeg"} alt={"panorama etape 1"}/> </Etape>
    )
}

const Etape2: FC = () => {
    return (
        <Etape nbQrCode={2} mot={"Verbal"}> <Image
            src={"/images/parcours/etape_2/2J283o0Dgp461m8Zb21yjR46KOyVNfT6I.jpeg"} alt={"zoom etape 2"}/> <Image
            src={"/images/parcours/etape_2/UKPt7g791xNdUV3KVLbCOm59g8imn5j3l.jpeg"} alt={"dezoom etape 2"}/> <Image
            src={"/images/parcours/etape_2/27FBv4ZwZ3VkG8h25caDfbXAlUBc1G7qg.jpeg"} alt={"panorama etape 2"}/> </Etape>
    )
}

const Etape3: FC = () => {
    return (
        <Etape nbQrCode={3} mot={"Mineur"}> <Image
            src={"/images/parcours/etape_3/2EnrwH34pwNpF9voxKZB6KJQ372Uu0e3W.jpeg"} alt={"zoom etape 3"}/> <Image
            src={"/images/parcours/etape_3/dscQH17YAvHi2CeS8UkoFgK7OmnJzkj0x.jpeg"} alt={"dezoom etape 3"}/> <Image
            src={"/images/parcours/etape_3/35DQ8V7M52x78ZFRg5pPqPrQtDVK2ylea.jpeg"} alt={"panorama etape 3"}/> </Etape>
    )
}

const Etape4: FC = () => {
    return (
        <Etape nbQrCode={4} mot={"Principe"}> <Image
            src={"/images/parcours/etape_4/DpCT5WjB3UhzgvONVwgZ5xn0Z5Qg1kDlV.jpeg"} alt={"zoom etape 4"}/> <Image
            src={"/images/parcours/etape_4/kYC24VzS6MdQ6lTsFTM9fRBzQrwFlwQGa.jpeg"} alt={"dezoom etape 4"}/> <Image
            src={"/images/parcours/etape_4/12jC69SZImHLm5oCM9I4vL6Fe8Gw6Cum6.jpeg"} alt={"panorama etape 4"}/> </Etape>
    )
}

const Etape5: FC = () => {
    return (
        <Etape nbQrCode={5} mot={"Verbe"}> <Image
            src={"/images/parcours/etape_5/9ztRxxO4p2ZA6HlopUwxSCXcmqCAg8mC5.jpeg"} alt={"zoom etape 5"}/> <Image
            src={"/images/parcours/etape_5/BNKepz49Bj4swM1z8vbpX2tZDhCB2a0VH.jpeg"} alt={"dezoom etape 5"}/> <Image
            src={"/images/parcours/etape_5/tbuu0WaWcMAjv6D8PmkJcBsN3U1hLUC1b.jpeg"} alt={"panorama etape 5"}/> </Etape>
    )
}

const Etape6: FC = () => {
    return (
        <Etape nbQrCode={6} mot={"Signature"}> <Image
            src={"/images/parcours/etape_6/YGr3zcYG9zVUM6R3eOER16yF16UeYIfqb.jpeg"} alt={"zoom etape 6"}/> <Image
            src={"/images/parcours/etape_6/7HHfeOkhDgsX8uL2jgSLIswklJ4YG8jwT.jpeg"} alt={"dezoom etape 6"}/> <Image
            src={"/images/parcours/etape_6/BzM67Nxr12g82n5DWLHrEwC3UKotE2zj2.jpeg"} alt={"panorama etape 6"}/> </Etape>
    )
}

// const Etape7 = () => {
//     return (
//         <Etape nbQrCode={7} mot={"soiree"}>
//             <Image src={"/images/parcours/etape_7/58B6E235-13F8-4106-AE90-1DFF8ECA2620_1_105_c.jpeg"}
//                    alt={"zoom etape 7"}/>
//             <Image src={"/images/parcours/etape_7/79C223EC-E947-4E50-86E6-954C03D62562_1_105_c.jpeg"}
//                    alt={"dezoom etape 7"}/>
//             <Image src={"/images/parcours/etape_7/36A852AA-7847-4804-87A3-D9582910478E_1_105_c.jpeg"}
//                    alt={"panorama etape 7"}/>
//         </Etape>
//     )
// }
//
// const Etape8 = () => {
//     return (
//         <Etape nbQrCode={8} mot={"aux"}>
//             <Image src={"/images/parcours/etape_8/F49F93D0-1093-4CDF-BE21-5236A1F09DD7_1_105_c.jpeg"}
//                    alt={"zoom etape 8"}/>
//             <Image src={"/images/parcours/etape_8/3D61F847-B7BA-48AB-A93D-CAF0CC69B73D_1_105_c.jpeg"}
//                    alt={"dezoom etape 8"}/>
//             <Image src={"/images/parcours/etape_8/02AD2484-C3CF-4D57-AD42-0CC7C8129040_1_105_c.jpeg"}
//                    alt={"panorama etape 8"}/>
//         </Etape>
//     )
// }
//
// const Etape9 = () => {
//     return (
//         <Etape nbQrCode={9} mot={"Gayeulles"}>
//             <Image src={"/images/parcours/etape_9/9CE83EF6-9770-4194-9C81-81D5A8B9056C_1_105_c.jpeg"}
//                    alt={"zoom etape 9"}/>
//             <Image src={"/images/parcours/etape_9/7C231ACC-CCEE-485A-99E3-68CE93C5D7FB_1_105_c.jpeg"}
//                    alt={"dezoom etape 9"}/>
//             <Image src={"/images/parcours/etape_9/EEB89395-F94B-4359-B9BC-CDBC067E09B0_1_105_c.jpeg"}
//                    alt={"panorama etape 9"}/>
//             <Image src={"/images/parcours/etape_9/"} alt={""}/>
//         </Etape>
//     )
// }
//
// const Etape10 = () => {
//     return (
//         <Etape nbQrCode={10} mot={"en"}>
//             <Image src={"/images/parcours/etape_10/1BA39F21-41B1-4584-A397-70ED6B71D064_1_105_c.jpeg"}
//                    alt={"zoom etape 10"}/>
//             <Image src={"/images/parcours/etape_10/3D7A6604-3961-4C5C-BF00-515015053782_1_105_c.jpeg"}
//                    alt={"dezoom etape 10"}/>
//             <Image src={"/images/parcours/etape_10/EA3CBFC0-3431-48AF-980C-0B25CE834F8F_1_105_c.jpeg"}
//                    alt={"panorama etape 10"}/>
//         </Etape>
//     )
// }
//
// const Etape11 = () => {
//     return (
//         <Etape nbQrCode={11} mot={"chantant."}>
//             <Image src={"/images/parcours/etape_11/EE5743D6-B37F-4902-89A9-98922FF892B1_1_105_c.jpeg"}
//                    alt={"zoom etape 11"}/>
//             <Image src={"/images/parcours/etape_11/532E22C2-460B-4BE9-8526-371B9C2684A6_1_105_c.jpeg"}
//                    alt={"zoom etape 11"}/>
//             <Image src={"/images/parcours/etape_11/40666D37-CE86-4311-8D8B-F00DDBD8CEE3_1_105_c.jpeg"}
//                    alt={"zoom etape 11"}/>
//         </Etape>
//     )
// }

export {
    Etape0,
    Etape1,
    Etape2,
    Etape3,
    Etape4,
    Etape5,
    Etape6,
    // Etape7,
    // Etape8,
    // Etape9,
    // Etape10,
    // Etape11,
}
