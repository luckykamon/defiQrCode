import React from 'react';
import NavBar from "./Navbar";
import PropTypes from "prop-types";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import {getCookie} from "../Functions/CookieFunction"

// function getCookie(cname) {
//     let name = cname + "=";
//     let decodedCookie = decodeURIComponent(document.cookie);
//     let ca = decodedCookie.split(';');
//     for(let i = 0; i <ca.length; i++) {
//         let c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return "";
// }

const Etape = (props) => {
    if (getCookieConsentValue("cookieConsent") && getCookie("QrCode-" + props.nbQrCode) === "") {
        //cookie expire in one month
        let date = new Date();
        date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = "QrCode-" + props.nbQrCode + "=" + JSON.stringify({"mot": props.mot.toString(), "url": window.location.href, "timestamp": Date.now()}) + ";" + expires
    }
    return (<div>
            <NavBar page="/etape_0"/>
            <h3 style={{
                textAlign: "Center",
                color: "white",
                marginTop: "40px"
            }}>QrCode {props.nbQrCode}: {props.mot}</h3>
            {props.children}
            {!props.hideFooter && (<Footer></Footer>)}
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
