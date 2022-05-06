import React from 'react';
import NavBar from "./Navbar";
import PropTypes from "prop-types";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

const Etape = (props) => {
    if (getCookieConsentValue("cookieConsent")) {
        document.cookie = "QrCode-" + props.nbQrCode + "=" + JSON.stringify({"mot": props.mot.toString(), "url": window.location.href, "timestamp": Date.now()})
    }
    console.log(getCookie("QrCode-" + props.nbQrCode))
    return (<div>
            <NavBar page="/etape_0"/>
            <h3 style={{
                textAlign: "Center",
                color: "white",
                marginTop: "40px"
            }}>QrCode {props.nbQrCode}: {props.mot}</h3>
            {props.children}
            <Footer></Footer>
        </div>
    )
}

Etape.propTypes =
    {
        nbQrCode: PropTypes.number.isRequired,
        mot: PropTypes.string.isRequired
    }

Etape.defaultProps =
    {
        titre: "",
        nbQrCode: 0,
        mot: "càpains"
    }

export default Etape
