import React from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs,} from "react-google-maps";
import Etape from "./affichage_etape"

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


const ViewGayeulles = () => {
    return (<Etape titre={"Voici le point de départ (le plus facile) 😉 avec pour premier mot: Les"}
                   src_1={"/images/parcours/etape_0/FDE5DFA0-60BA-450C-820F-EC43F440848B_1_105_c.jpeg"}
                   alt_1={"zoom etape 0"}
                   src_2={"/images/parcours/etape_0/E3A426AF-358D-4F7A-842E-7662E5D8B0FA_1_105_c.jpeg"}
                   alt_2={"dezoom etape 0"}
                   src_3={"/images/parcours/etape_0/22E4D739-56E2-4BC6-A03B-CDADFB1DACEA_1_105_c.jpeg"}
                   alt_3={"panorama etape 0"}>
            <StartMap style={{margin: "300px"}}/>
        </Etape>
    )
}

export default ViewGayeulles
