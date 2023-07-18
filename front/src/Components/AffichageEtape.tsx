import React, {FC, ReactNode} from 'react';
import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import {getLocalStorage, setLocalStorage} from "../Functions/LocalStorage";

interface AffichageEtapeProps {
    nbQrCode: number,
    mot: string,
    children?: ReactNode
}

const AffichageEtape: FC<AffichageEtapeProps> = ({nbQrCode = 0, mot = "Exemple", children}) => {
    if (getCookieConsentValue("cookieConsent") && getLocalStorage("QrCode-" + nbQrCode) === null) {
        // Sauvegarde du QrCode scanné dans le localStorage
        setLocalStorage("QrCode-" + nbQrCode, JSON.stringify({
            "mot": mot,
            "url": window.location.href,
            "timestamp": Date.now()
        }));
        // Envoie du QrCode scanné à l'API afin de le synchroniser avec l'équipe
        const equipeId = getLocalStorage("equipeId");
        const idQrCode = window.location.pathname.split("/")[1];
        if (equipeId !== null && idQrCode !== null) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "idQrCode": idQrCode,
                "equipeId": equipeId
            });

            fetch(process.env.REACT_APP_URL_BACK + "/api/qrcode", {
                method: 'POST',
                headers: myHeaders,
                body: raw
            })
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
        }
    }
    return (
        <div>
            <NavBar/>
            <h4 style={{
                textAlign: "center",
                color: "white",
                marginTop: "40px",
                marginBottom: "20px",
            }}><p>Bravo ! Vous avez scanné le QrCode <span style={{color: "#fe6928"}}>{nbQrCode}</span>. L&apos;indice <span
                style={{color: "#fe6928"}}>{mot}</span> dans l&apos;onglet <a href="/front/src/Pages/Avancee">AVANCÉE</a> vous aidera à
                découvrir le mot cachée.</p>
                <p style={{marginTop: "6px"}}>Les images ci-dessous indiquent où se trouve le prochain QrCode:</p>
            </h4>
            {children} <Footer/>
        </div>
    )
}

export default AffichageEtape
