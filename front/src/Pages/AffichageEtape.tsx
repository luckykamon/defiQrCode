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
            <h3 style={{
                textAlign: "center",
                color: "white",
                marginTop: "40px"
            }}>QrCode {nbQrCode}: {mot}</h3>{children} <Footer/>
        </div>
    )
}

export default Etape
