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
    let resultScanTab = [
        {nbQrCode: 0, mot: "Les", url: "/etape_0"},
        {nbQrCode: 1, mot: "capains", url: "/nq20CjprDksS"},
        {nbQrCode: 2, mot: "font", url: "/U6BeT2kldxeY"},
        {nbQrCode: 3, mot: "la", url: "/ZFw1bKuekyNl"},
        {nbQrCode: 4, mot: "fete", url: "/lBVt7ypM5oPa"},
        {nbQrCode: 5, mot: "toute", url: "/Gnbo5WHSB20C"},
        {nbQrCode: 6, mot: "la", url: "/qQdbfyALH9Nz"},
        {nbQrCode: 7, mot: "soiree", url: "/q7ZqAEY7nqYQ"},
        {nbQrCode: 8, mot: "aux", url: "/96vSXCMPHfVZ"},
        {nbQrCode: 9, mot: "Gayeulles", url: "/e8EP7hPTDgYT"},
        {nbQrCode: 10, mot: "en", url: "/2dntPyEx7Et9"},
        {nbQrCode: 11, mot: "chantant.", url: "/ezMyOYo0X2De"}
    ]

    return (
        <tbody>
        {resultScanTab.map(resultScan =>
            <tr key={resultScan["nbQrCode"]}>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["nbQrCode"]}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["mot"]}</BaliseAIfHref></td>
                <td><BaliseAIfHref href={resultScan["url"]}>{resultScan["url"]}</BaliseAIfHref></td>
            </tr>
        )}
        </tbody>
    )
}

const TableResult = () => {
    return (
        <table style={{textAlign: "center", width: "100%"}} id="ex1-grid" role="grid" aria-labelledby="grid1Label"
               className="data">
            <thead>
            <tr>
                <th style={{width: "25%"}}>Numéro QrCode</th>
                <th style={{width: "25%"}}>Mot trouvé</th>
                <th style={{width: "25%"}}>URL</th>
                {/*<th style={{width: "25%"}}>Date</th>*/}
            </tr>
            </thead>
            <ResultScan></ResultScan>
        </table>
    )
}


const QrCodeSoluce = (props) => {
    return (
        <div>
            <NavBar page="/solution"/>
            <h3 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>Solution:</h3>
            <TableResult/>
            {props.children}
            <Footer/>
        </div>
    )
}


export default QrCodeSoluce
