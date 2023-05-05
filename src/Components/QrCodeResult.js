import React, {useEffect, useState} from 'react';
import NavBar from "./Navbar";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {deleteLocalStorage, getLocalStorage} from "../Functions/LocalStorageFunction";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

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

    for (let i = 0; i <= 6; i++) {
        let localStorage = getLocalStorage("QrCode-" + i)
        let resultScanJson = {}
        resultScanJson["nbQrCode"] = i
        if (localStorage === null) {
            resultScanJson["mot"] = ""
            resultScanJson["url"] = ""
            resultScanJson["timestamp"] = ""
        } else {
            let parseLocalStorage = JSON.parse(localStorage)
            resultScanJson["mot"] = parseLocalStorage["mot"]
            resultScanJson["url"] = parseLocalStorage["url"]
            resultScanJson["timestamp"] = (new Date(parseInt(parseLocalStorage["timestamp"]))).toLocaleString()
        }
        resultScanTab.push(resultScanJson)
    }

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
            <ResultScan/>
        </table>
    )
}

/**
 * Affiche une durée sans les ms au format humain
 * @param ms
 * @returns {string}
 */
function afficherDuree(ms) {
    if (ms === 0) {
        return (<span style={{fontSize: "15px"}}>Scannez le premier QrCode pour démarrer le chrono</span>)
    }
    const duree = new Date(ms);
    const heures = duree.getUTCHours();
    const minutes = duree.getUTCMinutes();
    const secondes = duree.getUTCSeconds();

    let dureeString = '';
    if (heures > 0) {
        dureeString += heures + 'h ';
    }
    if (minutes > 0) {
        dureeString += minutes + 'm ';
    }
    if (secondes > 0) {
        dureeString += secondes + 's ';
    }
    return (dureeString);
}

const TempsParcours = () => {
    const [tempsParcoursTimeStamp, setTempsParcoursTimeStamp] = useState(0);
    const [allQrCodeFind, setAllQrCodeFind] = useState(false);

    useEffect(() => {
        let timer = null;

        const checkTime = () => {
            let timestampMin = null;
            let timestampMax = null;
            let allFound = true;

            for (let i = 0; i <= 6; i++) {
                let localStorage = getLocalStorage("QrCode-" + i)
                if (localStorage !== null) {
                    let parseLocalStorage = JSON.parse(localStorage);
                    if (timestampMin === null) {
                        timestampMin = parseInt(parseLocalStorage["timestamp"]);
                    } else if (timestampMin > parseInt(parseLocalStorage["timestamp"])) {
                        timestampMin = parseInt(parseLocalStorage["timestamp"]);
                    }

                    if (timestampMax === null) {
                        timestampMax = parseInt(parseLocalStorage["timestamp"]);
                    } else if (timestampMax < parseInt(parseLocalStorage["timestamp"])) {
                        timestampMax = parseInt(parseLocalStorage["timestamp"]);
                    }
                } else {
                    allFound = false;
                }
            }

            if (allFound) {
                setTempsParcoursTimeStamp(timestampMax - timestampMin);
                setAllQrCodeFind(true);
            } else if (timestampMin === null && timestampMax === null) {
                setTempsParcoursTimeStamp(0);
            } else {
                setTempsParcoursTimeStamp(Date.now() - timestampMin);
            }
        }

        checkTime();

        timer = setInterval(() => {
            if (!allQrCodeFind) {
                checkTime();
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [allQrCodeFind]);

    let tempsParcoursHuman = afficherDuree(tempsParcoursTimeStamp);
    return (
        <h3 style={{textAlign: "Center", color: "white"}}>Temps Parcours: {tempsParcoursHuman}</h3>
    )
}

const InputMot = () => {
    const [confetti, setConfetti] = useState(false);
    const { width, height } = useWindowSize();

    const checkMot = () => {
        let mot = document.getElementById("mot").value;
        if (mot === "rouge") {
            setConfetti(true);
        } else {
            alert("Bravo, vous avez trouvé le mot !");
        }
    }

    return (

        <div style={{display: "flex", justifyContent: "center", marginTop: "20px"}}>
            <input type="text" id="mot" name="mot" placeholder="Mot" style={{height: "40px", borderRadius: "10px"}}/>
            <div style={{width: "20px"}}/>
            <button type="button" onClick={checkMot} style={{height: "40px", padding: "0 10px", borderRadius: "10px"}}>Vérifier</button>
            {confetti && <Confetti width={width} height={height}/>}
        </div>
    )
}

const TempsMot = () => {

}


const QrCodeResult = () => {
    return (<div>
            <NavBar page="/QrCodeResult"/>
            <h3 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>Avancée: <FontAwesomeIcon
                icon={faRotate} onClick={deleteLocalStorage}/></h3>
            <TableResult/> <InputMot/> <TempsMot/> <TempsParcours/> <Footer/>
        </div>
    )
}

export default QrCodeResult
