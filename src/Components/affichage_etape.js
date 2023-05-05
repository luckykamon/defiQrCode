import React from 'react';
import NavBar from "./Navbar";
import PropTypes from "prop-types";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import {getLocalStorage, setLocalStorage} from "../Functions/LocalStorageFunction";


const Etape = (props) => {
    if (getCookieConsentValue("cookieConsent") && getLocalStorage("QrCode-" + props.nbQrCode) === null) {
        setLocalStorage("QrCode-" + props.nbQrCode, JSON.stringify({"mot": props.mot.toString(), "url": window.location.href, "timestamp": Date.now()}));
    }
    return (<div>
            <NavBar page="/etape_0"/>
            <h3 style={{
                textAlign: "Center",
                color: "white",
                marginTop: "40px"
            }}>QrCode {props.nbQrCode}: {props.mot}</h3>
            {props.children}
            <Footer/>
        </div>
    )
}

Etape.propTypes =
    {
        nbQrCode: PropTypes.number.isRequired,
        mot: PropTypes.string.isRequired,
        hideFooter: PropTypes.any
    }

Etape.defaultProps =
    {
        titre: "",
        nbQrCode: 0,
        mot: "càpains"
    }

export default Etape
