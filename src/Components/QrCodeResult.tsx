import React, {FC, ReactNode, useEffect, useState} from 'react';
import NavBar from "./Navbar";
import Footer from "./Footer";
import {getCookieConsentValue} from "react-cookie-consent";
import PropTypes from "prop-types";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {deleteLocalStorage, getLocalStorage, setLocalStorage} from "../Functions/LocalStorageFunction";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

type BaliseAIfHrefProps = {
    href: string,
    children: ReactNode
}

const BaliseAIfHref: FC<BaliseAIfHrefProps> = (props) => {
    if (props.href !== "") {
        return <a href={props.href}>{props.children}</a>
    } else {
        return <>{props.children}</>
    }
}

BaliseAIfHref.propTypes =
    {
        href: PropTypes.string
    }

const ResultScan: FC = () => {
    let resultScanTab: Array<any> = []

    for (let i = 0; i <= 6; i++) {
        let localStorage = getLocalStorage("QrCode-" + i)
        let resultScanJson: { [k: string]: any } = {}
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

const TableResult: FC = () => {
    const [refresh, setRefresh] = useState(0);

    // On actualise l'avancée toutes les 10 secondes afin que lorsque l'on scan un QrCode sur une autre page alors que l'on est sur la page des résultats, on voit le résultat s'actualiser
    useEffect(() => {
        const interval = setInterval(() => {
            setRefresh(refresh + 1);
        }, 1000);

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
function afficherDuree(ms: number) {
    if (ms === 0) {
        return (<span style={{fontSize: "15px"}}>Scannez le premier QrCode pour démarrer le chrono</span>)
    }
    const duree = new Date(ms);
    const jours = Math.floor(duree.getTime() / (1000 * 60 * 60 * 24));
    const heures = duree.getUTCHours();
    const minutes = duree.getUTCMinutes();
    const secondes = duree.getUTCSeconds();

    let dureeString = '';
    if (jours > 0) {
        dureeString += jours + 'j ';
    }
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

function afficherScore(tempsParcoursTimeStamp: number, tempsMotTimeStamp: number) {
    if (tempsParcoursTimeStamp === 0 || tempsMotTimeStamp === 0) {
        return (<span style={{fontSize: "15px"}}>Scannez le premier QrCode pour afficher le score</span>)
    }
    return parseInt((7200000 / (1 + Math.sqrt(tempsParcoursTimeStamp + tempsMotTimeStamp))).toString()) + " points";
}

const TempsParcours: FC = () => {
    const [tempsParcoursTimeStamp, setTempsParcoursTimeStamp] = useState(0);
    const [tempsMotTimeStamp, setTempsMotTimeStamp] = useState(0);
    const [allQrCodeFind, setAllQrCodeFind] = useState(false);
    const [motTrouve, setMotTrouve] = useState(false);

    useEffect(() => {
        let timer = null;

        const checkTime = () => {
            let timestampMin: number | null = null;
            let timestampMax: number | null = null;
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
                setTempsMotTimeStamp(parseInt(localStorageMot) - (timestampMin ? timestampMin : 0));
            } else if (timestampMin !== null) {
                setTempsMotTimeStamp(Date.now() - timestampMin);
            } else {
                setTempsMotTimeStamp(0);
            }

            if (allFound) {
                setTempsParcoursTimeStamp((timestampMax ? timestampMax : 0) - (timestampMin ? timestampMin : 0));
                setAllQrCodeFind(true);
            } else if (timestampMin === null && timestampMax === null) {
                setTempsParcoursTimeStamp(0);
            } else {
                setTempsParcoursTimeStamp(Date.now() - (timestampMin ? timestampMin : 0));
            }
        }

        checkTime();

        timer = setInterval(() => {
            if (!allQrCodeFind || !motTrouve) {
                checkTime();
            } else {
                clearInterval(timer as NodeJS.Timeout);
            }
        }, 1000);

        return () => {
            clearInterval(timer as NodeJS.Timeout);
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

const InputMot: FC = () => {
    const [confetti, setConfetti] = useState(false);
    const [mauvaiseReponse, setMauvaiseReponse] = useState(false); // null -> en attente, true -> mauvaise réponse, false -> bonne réponse
    const {width, height} = useWindowSize();

    const checkMot = () => {
        let mot = (document.getElementById("mot") as HTMLInputElement).value;
        if (mot.toLowerCase().replace(new RegExp(" ", 'g'), "") === "accord") {
            setConfetti(true);
            setMauvaiseReponse(false);
            setLocalStorage("temps-mot", Date.now().toString());
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


const QrCodeResult: FC = () => {

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
