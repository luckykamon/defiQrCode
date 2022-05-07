import React from 'react';
import Etape from "./affichage_etape"
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import Image from "./Image";

const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={15}
        defaultCenter={{
            lat: 48.135328, lng: -1.646004

        }}
    >
        <Marker
            position={{
                lat: 48.130923,
                lng: -1.643998
            }}
        />
    </GoogleMap>
));


const StartMap = () => {
    return (
        <MapWithAMarker
            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyABsHhhnZoXoA7fiMiauQvJbCKPJyuBz7g&v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{height: `100%`}}/>}
            containerElement={<div style={{height: `400px`}}/>}
            mapElement={<div style={{height: `90vh`}}/>}
        />
    );
}

const Etape0 = () => {
    return (
        <Etape nbQrCode={0} mot={"Les"} hideFooter>
            <Image src={"/images/parcours/etape_0/FDE5DFA0-60BA-450C-820F-EC43F440848B_1_105_c.jpeg"} alt={"zoom etape 0"}/>
            <Image src={"/images/parcours/etape_0/E3A426AF-358D-4F7A-842E-7662E5D8B0FA_1_105_c.jpeg"} alt={"dezoom etape 0"}/>
            <Image src={"/images/parcours/etape_0/22E4D739-56E2-4BC6-A03B-CDADFB1DACEA_1_105_c.jpeg"} alt={"panorama etape 0"}/>
            <StartMap style={{margin: "300px"}}/>
        </Etape>
    )
}

const Etape1 = () => {
    return (
        <Etape nbQrCode={1} mot={"capains"}>
            <Image src={"/images/parcours/etape_1/80BE8BBD-031E-4065-83BB-EB480D3C2E5F_1_105_c.jpeg"} alt={"zoom etape 1"}/>
            <Image src={"/images/parcours/etape_1/FB2AC173-6E2F-4C48-8312-DD413F1B26C8_1_105_c.jpeg"} alt={"dezoom etape 2"}/>
            <Image src={"/images/parcours/etape_1/7FFDB2E3-04F6-4C44-B79D-0C744C419F3C_1_102_o.jpeg"} alt={"panorama etape 2"}/>
        </Etape>
    )
}

const Etape2 = () => {
    return (
        <Etape nbQrCode={2} mot={"font"}>
            <Image src={"/images/parcours/etape_2/4B44CCB1-061F-4168-902F-680E62584DAF_1_105_c.jpeg"} alt={"zoom etape 2"}/>
            <Image src={"/images/parcours/etape_2/1916CCE0-FD56-42FB-9C77-DDBA969B90BC_1_105_c.jpeg"} alt={"dezoom etape 2"}/>
            <Image src={"/images/parcours/etape_2/D36F9E81-712D-4D56-9E41-7A588FDFD8D5_1_105_c.jpeg"} alt={"panorama etape 2"}/>
            <Image src={"/images/parcours/etape_2/1ED7E006-AD41-422A-A64A-A3774E3A0E30_1_105_c.jpeg"} alt={"Image Bonus"}/>
        </Etape>
    )
}

const Etape3 = () => {
    return (
        <Etape nbQrCode={3} mot={"la"}>
            <Image src={"/images/parcours/etape_3/15D01B24-AFC9-46DE-A2BD-7B22617B1B37_1_105_c.jpeg"} alt={"Arbre"}></Image>
        </Etape>
    )
}

const Etape4 = () => {
    return (
        <Etape nbQrCode={4} mot={"fete"}>
            <Image src={"/images/parcours/etape_4/8B4E6207-46D8-4F6A-95E7-39A7E5B6B9CA_1_105_c.jpeg"} alt={"zoom etape 4"}/>
            <Image src={"/images/parcours/etape_4/C33809CA-232C-405F-B9DB-15E1E6BEFEC4_1_105_c.jpeg"} alt={"dezoom etape 4"}/>
            <Image src={"/images/parcours/etape_4/173FBFA8-DC33-42C1-9D94-573A50810A30_1_105_c.jpeg"} alt={"panorama etape 4"}/>
            <Image src={"/images/parcours/etape_4/1B5A35D6-BDC4-42ED-B35F-70D2AFF9407B_1_105_c.jpeg"} alt={"Image Bonus"}/>
        </Etape>
    )
}

const Etape5 = () => {
    return (
        <Etape nbQrCode={5} mot={"toute"}>
            <Image src={"/images/parcours/etape_5/5D4D49E8-112E-4364-BB8A-4C2849DA96ED_1_105_c.jpeg"} alt={"zoom etape 5"}/>
            <Image src={"/images/parcours/etape_5/008CFB4E-704C-47A9-AD61-EA8D51BCE951_1_105_c.jpeg"} alt={"dezoom etape 5"}/>
            <Image src={"/images/parcours/etape_5/362A1544-DB4F-4C17-ABE9-72F4C799B898_1_102_o.jpeg"} alt={"panorama etape 5"}/>
        </Etape>
    )
}

const Etape6 = () => {
    return (
        <Etape nbQrCode={6} mot={"la"}>
            <Image src={"/images/parcours/etape_6/1204A17A-684D-4872-A324-9A122BB4A0E3_1_105_c.jpeg"} alt={"zoom etape 6"}/>
            <Image src={"/images/parcours/etape_6/4E330359-A744-40B4-9124-E8552D6C8D91_1_105_c.jpeg"} alt={"dezoom etape 6"}/>
            <Image src={"/images/parcours/etape_6/86D9126E-1F15-4EC3-818C-A779AD493728_1_105_c.jpeg"} alt={"panorama etape 6"}/>
        </Etape>
    )
}

const Etape7 = () => {
    return (
        <Etape nbQrCode={7} mot={"soiree"}>
            <Image src={"/images/parcours/etape_7/58B6E235-13F8-4106-AE90-1DFF8ECA2620_1_105_c.jpeg"} alt={"zoom etape 7"}/>
            <Image src={"/images/parcours/etape_7/79C223EC-E947-4E50-86E6-954C03D62562_1_105_c.jpeg"} alt={"dezoom etape 7"}/>
            <Image src={"/images/parcours/etape_7/36A852AA-7847-4804-87A3-D9582910478E_1_105_c.jpeg"} alt={"panorama etape 7"}/>
        </Etape>
    )
}

const Etape8 = () => {
    return (
        <Etape nbQrCode={8} mot={"aux"}>
            <Image src={"/images/parcours/etape_8/F49F93D0-1093-4CDF-BE21-5236A1F09DD7_1_105_c.jpeg"} alt={"zoom etape 8"}/>
            <Image src={"/images/parcours/etape_8/3D61F847-B7BA-48AB-A93D-CAF0CC69B73D_1_105_c.jpeg"} alt={"dezoom etape 8"}/>
            <Image src={"/images/parcours/etape_8/02AD2484-C3CF-4D57-AD42-0CC7C8129040_1_105_c.jpeg"} alt={"panorama etape 8"}/>
        </Etape>
    )
}

const Etape9 = () => {
    return (
        <Etape nbQrCode={9} mot={"Gayeulles"}>
            <Image src={"/images/parcours/etape_9/9CE83EF6-9770-4194-9C81-81D5A8B9056C_1_105_c.jpeg"} alt={"zoom etape 9"}/>
            <Image src={"/images/parcours/etape_9/7C231ACC-CCEE-485A-99E3-68CE93C5D7FB_1_105_c.jpeg"} alt={"dezoom etape 9"}/>
            <Image src={"/images/parcours/etape_9/EEB89395-F94B-4359-B9BC-CDBC067E09B0_1_105_c.jpeg"} alt={"panorama etape 9"}/>
            <Image src={"/images/parcours/etape_9/"} alt={""}/>
        </Etape>
    )
}

const Etape10 = () => {
    return (
        <Etape nbQrCode={10} mot={"en"}>
            <Image src={"/images/parcours/etape_10/1BA39F21-41B1-4584-A397-70ED6B71D064_1_105_c.jpeg"} alt={"zoom etape 10"}/>
            <Image src={"/images/parcours/etape_10/3D7A6604-3961-4C5C-BF00-515015053782_1_105_c.jpeg"} alt={"dezoom etape 10"}/>
            <Image src={"/images/parcours/etape_10/EA3CBFC0-3431-48AF-980C-0B25CE834F8F_1_105_c.jpeg"} alt={"panorama etape 10"}/>
        </Etape>
    )
}

const Etape11 = () => {
    return (
        <Etape nbQrCode={11} mot={"chantant."}>
            <Image src={"/images/parcours/etape_11/EE5743D6-B37F-4902-89A9-98922FF892B1_1_105_c.jpeg"} alt={"zoom etape 11"}/>
            <Image src={"/images/parcours/etape_11/532E22C2-460B-4BE9-8526-371B9C2684A6_1_105_c.jpeg"} alt={"zoom etape 11"}/>
            <Image src={"/images/parcours/etape_11/40666D37-CE86-4311-8D8B-F00DDBD8CEE3_1_105_c.jpeg"} alt={"zoom etape 11"}/>
        </Etape>
    )
}

export {
    Etape0,
    Etape1,
    Etape2,
    Etape3,
    Etape4,
    Etape5,
    Etape6,
    Etape7,
    Etape8,
    Etape9,
    Etape10,
    Etape11,
}
