import React, {useEffect, useState} from 'react';
import NavBar from "./Navbar";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {deleteLocalStorage, getLocalStorage, setLocalStorage} from "../Functions/LocalStorageFunction";
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
    const [refresh, setRefresh] = useState(0);

    // On actualise l'avancée toutes les 10 secondes afin que lorsque l'on scan un QrCode sur une autre page alors que l'on est sur la page des résultats, on voit le résultat s'actualiser
    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(refresh + 1);
        }, 10000);

        return () => clearInterval(interval);
    }, [refresh]);

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
            <ResultScan key={refresh}/>
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

function afficherScore(tempsParcoursTimeStamp, tempsMotTimeStamp) {
    if ( tempsParcoursTimeStamp === 0 || tempsMotTimeStamp === 0) {
        return (<span style={{fontSize: "15px"}}>Scannez le premier QrCode pour afficher le score</span>)
    }
    return parseInt(7200000 / (1 + Math.sqrt(tempsParcoursTimeStamp + tempsMotTimeStamp)));
}

const TempsParcours = () => {
    const [tempsParcoursTimeStamp, setTempsParcoursTimeStamp] = useState(0);
    const [tempsMotTimeStamp, setTempsMotTimeStamp] = useState(0);
    const [allQrCodeFind, setAllQrCodeFind] = useState(false);
    const [motTrouve, setMotTrouve] = useState(false);

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

            let localStorageMot = getLocalStorage("temps-mot");
            if (localStorageMot !== null) {
                setMotTrouve(true);
                setTempsMotTimeStamp(parseInt(parseInt(localStorageMot) - timestampMin));
            } else if (timestampMin !== null) {
                setTempsMotTimeStamp(parseInt(Date.now() - timestampMin));
            } else {
                setTempsMotTimeStamp(0);
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
            if (!allQrCodeFind || !motTrouve) {
                checkTime();
            } else {
                clearInterval(timer);
            }
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, [allQrCodeFind, motTrouve]);

    let tempsMotHuman = afficherDuree(tempsMotTimeStamp);
    let tempsParcoursHuman = afficherDuree(tempsParcoursTimeStamp);
    let score = afficherScore(tempsParcoursTimeStamp, tempsMotTimeStamp);

    return (
        <>
            <h3 style={{textAlign: "Center", color: "white"}}>Temps Mot: {tempsMotHuman}</h3>
            <h3 style={{textAlign: "Center", color: "white"}}>Temps Parcours: {tempsParcoursHuman}</h3>
            <h3 style={{textAlign: "Center", color: "white"}}>Score: {score}</h3>
        </>
    )
}

const InputMot = () => {
    const [confetti, setConfetti] = useState(false);
    const [mauvaiseReponse, setMauvaiseReponse] = useState(false);
    const {width, height} = useWindowSize();

    const checkMot = () => {
        let mot = document.getElementById("mot").value;
        if (mot.toLowerCase() === "accord") {
            setConfetti(true);
            setMauvaiseReponse(false);
            setLocalStorage("temps-mot", Date.now());
        } else {
            setMauvaiseReponse(true);
            setConfetti(false);
            setTimeout(() => {
                setMauvaiseReponse(false);
            }, 500);
        }
    }

    let defiQrCodeBegin = false;
    for (let i = 0; i <= 6; i++) {
        let localStorage = getLocalStorage("QrCode-" + i);
        if (localStorage !== null) {
            defiQrCodeBegin = true;
        }
    }
    if (!defiQrCodeBegin) {
        return (<></>)
    }

    return (

        <div className={mauvaiseReponse ? "shake" : ""}
             style={{display: "flex", justifyContent: "center", marginTop: "20px", flexWrap: "wrap"}}>
            <input type="text" id="mot" name="mot" placeholder="Tapez votre mot ici"
                   style={{height: "40px", borderRadius: "10px"}}/>
            <div style={{width: "100vw"}}></div>
            <button type="button" onClick={checkMot}
                    style={{height: "40px", padding: "0 10px", borderRadius: "10px"}}>Vérifier
            </button>
            {confetti && <Confetti width={width} height={height}/>}
        </div>
    )
}


const QrCodeResult = () => {
    return (
        <div>
            <NavBar page="/QrCodeResult"/>
            <h3 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>Avancée: <FontAwesomeIcon
                icon={faRotate} onClick={deleteLocalStorage}/></h3>
            <TableResult/> <InputMot/> <TempsParcours/> <Footer/>
        </div>
    )
}

export default QrCodeResult
