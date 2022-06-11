import React from 'react';
import NavBar from "./Navbar";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {deleteLocalStorage, getLocalStorage} from "../Functions/LocalStorageFunction";


const BaliseAIfHref = (props) => {
    if (props.href !== "") {
        return <a href={props.href}>{props.children}</a>
    } else {
        return (props.children)
    }
}

BaliseAIfHref.propTypes =
    {
        href: PropTypes.string
    }

const ResultScan = () => {
    let resultScanTab = []

    for (let i = 0; i <= 11; i++) {
        let cookie = getLocalStorage("QrCode-" + i)
        let resultScanJson = {}
        resultScanJson["nbQrCode"] = i
        if (cookie === null) {
            resultScanJson["mot"] = ""
            resultScanJson["url"] = ""
            resultScanJson["timestamp"] = ""
        } else {
            let parseCookie = JSON.parse(cookie)
            resultScanJson["mot"] = parseCookie["mot"]
            resultScanJson["url"] = parseCookie["url"]
            resultScanJson["timestamp"] = (new Date(parseInt(parseCookie["timestamp"]))).toLocaleString()
        }
        resultScanTab.push(resultScanJson)
    }
    console.log(resultScanTab)
    return (
        <tbody>
        {resultScanTab.map(resultScan =>
            <tr key={resultScan["nbQrCode"]}>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["nbQrCode"]}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["mot"]}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["timestamp"]}</BaliseAIfHref></td>
            </tr>
        )}
        </tbody>
    )
}

const TableResult = () => {
    if (!getCookieConsentValue("cookieConsent")) {
        return (<div style={{textAlign: "center"}}>
            <p>Le site sauvegarde les QrCode scannés dans les Cookies, veuillez les acceptez 🍪 ci-dessous</p>
        </div>)
    }

    return (
        <table style={{textAlign: "center", width: "100%"}} id="ex1-grid" role="grid" aria-labelledby="grid1Label"
               className="data">
            <thead>
            <tr>
                <th style={{width: "25%"}}>Numéro QrCode</th>
                <th style={{width: "25%"}}>Mot trouvé</th>
                {/*<th style={{width: "25%"}}>URL</th>*/}
                <th style={{width: "25%"}}>Date</th>
            </tr>
            </thead>
            <ResultScan></ResultScan>
        </table>
    )
}


const QrCodeResult = (props) => {
    return (<div>
            <NavBar page="/QrCodeResult"/>
            <h3 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>Avancée: <FontAwesomeIcon
                icon={faRotate} onClick={deleteLocalStorage}/></h3>
            <TableResult/>
            {props.children}
            <Footer/>
        </div>
    )
}


export default QrCodeResult
