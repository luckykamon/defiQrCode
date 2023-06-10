import React, {FC, ReactNode} from 'react';
import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import {getLocalStorage, setLocalStorage} from "../Functions/LocalStorage";

interface EtapeProps {
    nbQrCode: number,
    mot: string,
    hideFooter?: any,
    children?: ReactNode
}

const Etape: FC<EtapeProps> = ({nbQrCode = 0, mot = "càpains", children}) => {
    if (getCookieConsentValue("cookieConsent") && getLocalStorage("QrCode-" + nbQrCode) === null) {
        setLocalStorage("QrCode-" + nbQrCode, JSON.stringify({
            "mot": mot,
            "url": window.location.href,
            "timestamp": Date.now()
        }));
    }
    return (
        <div>
            <NavBar page="/etape_0"/>
            <h4 style={{
                textAlign: "center",
                color: "white",
                marginTop: "40px",
                marginBottom: "20px",
            }}><p>Bravo ! Vous avez scanné le QrCode <span style={{color: "#fe6928"}}>{nbQrCode}</span>. L'indice <span style={{color: "#fe6928"}}>{mot}</span> dans l'onglet <a href="/QrCodeResult">AVANCÉE</a> vous aidera à découvrir le mot cachée.</p>
                <p style={{marginTop: "6px"}}>Les images ci-dessous indiquent où se trouve le prochain QrCode:</p>
            </h4>{children} <Footer/>
        </div>
    )
}

export default Etape
