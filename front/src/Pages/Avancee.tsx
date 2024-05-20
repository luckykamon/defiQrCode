import React, {FC, ReactNode, useEffect, useState} from 'react';
import {getCookieConsentValue} from "react-cookie-consent";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faRotate} from "@fortawesome/free-solid-svg-icons";
import {deleteLocalStorage, getLocalStorage, setLocalStorage} from "../Functions/LocalStorage";
import Confetti from 'react-confetti'
import {ProgressBar, Step} from 'react-step-progress-bar';
import "react-step-progress-bar/styles.css";

const BaliseAIfHref: FC<{
    href: string,
    children?: ReactNode
}> = ({href, children}) => {
    if (href !== "") {
        return <a href={href}>{children}</a>
    } else {
        return <>{children}</>
    }
}

const VerticalProgressBar: React.FC = () => {
    let currentStep = -1;

    const resultScanTab: Array<{ nbQrCode: number, mot: string, url: string, timestamp: string }> = []
    for (let i = 0; i < parseInt(getLocalStorage("nbQrCode")); i++) {
        const localStorage = getLocalStorage("QrCode-" + i)
        const resultScanJson: { nbQrCode: number, mot: string, url: string, timestamp: string } = {
            nbQrCode: i, mot: "", url: "", timestamp: ""
        }
        if (localStorage !== null) {
            const parseLocalStorage = JSON.parse(localStorage)
            resultScanJson["mot"] = parseLocalStorage["mot"]
            resultScanJson["url"] = parseLocalStorage["url"]
            resultScanJson["timestamp"] = (new Date(parseInt(parseLocalStorage["timestamp"]))).toLocaleString()
            if (currentStep + 1 === i) {
                currentStep++;
            }
        }
        resultScanTab.push(resultScanJson)
    }

    const nbSteps = resultScanTab.length;
    const percentage = (currentStep / (nbSteps - 1)) * 100;

    const heightStep = 100;
    const totalHeight = nbSteps * heightStep - 100

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: "20px"
        }}>
            <div style={{
                display: 'flex', // Utilisation de flexbox
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <div style={{
                    height: totalHeight + 'px',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: totalHeight + 'px',
                        width: '100%',
                        transform: 'rotate(90deg)',
                        transformOrigin: 'top left'
                    }}>
                        <ProgressBar percent={percentage} filledBackground="rgb(254, 105, 40)"
                                     width={totalHeight}>
                            {Array.from({length: nbSteps}, (_, index) => (
                                <Step key={index} transition="scale">
                                    {() => (
                                        <div className={`indexedStep ${resultScanTab[index]["mot"] ? "accomplished" : ""}`}>
                                            <h4>{index}</h4>
                                        </div>
                                    )}
                                </Step>
                            ))}
                        </ProgressBar>
                    </div>
                </div>
                {/* Texte à droite de la barre de progression */}
                <div style={{marginLeft: '30px', marginTop: '0px'}}>
                    {resultScanTab.map(resultScan =>
                        (
                            <div key={resultScan.nbQrCode} style={{height: heightStep, display: "flex", alignItems: "center"}}>
                                {resultScan["mot"] && (
                                    <BaliseAIfHref href={resultScan["url"]}>
                                    <div style={{maxHeight: heightStep + "px"}}>
                                        <h5 style={{lineHeight: "25px"}}>Date du scan: {resultScan["timestamp"]}</h5>
                                        <h5 style={{lineHeight: "25px"}}>Indice: {resultScan["mot"]}</h5>
                                    </div>
                                    </BaliseAIfHref>
                                )}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};


const ProgressResult: FC = () => {
    return (
        <VerticalProgressBar/>
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
            const nbQrCodeString = getLocalStorage("nbQrCode");
            let nbQrCode = 7;
            try {
                nbQrCode = parseInt(nbQrCodeString);
            } catch (error) {
                console.log(error);
            }

            for (let i = 1; i < nbQrCode; i++) {
                const localStorage = getLocalStorage("QrCode-" + i)
                if (localStorage !== null) {
                    const parseLocalStorage = JSON.parse(localStorage);
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

            const localStorageMot = getLocalStorage("temps-mot");
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

    const tempsMotHuman = afficherDuree(tempsMotTimeStamp);
    const tempsParcoursHuman = afficherDuree(tempsParcoursTimeStamp);
    // let score = afficherScore(tempsParcoursTimeStamp, tempsMotTimeStamp);

    return (
        <>
            <h3 style={{textAlign: "center", color: "white"}}>Temps Mot: {tempsMotHuman}</h3>
            <h3 style={{textAlign: "center", color: "white"}}>Temps Parcours: {tempsParcoursHuman}</h3>
        </>
    )
}

const InputMot: FC = () => {
    const [confetti, setConfetti] = useState(false);
    const [mauvaiseReponse, setMauvaiseReponse] = useState(false); // null -> en attente, true -> mauvaise réponse, false -> bonne réponse
    const width = Math.max(
        document.documentElement.scrollWidth,
        document.body.scrollWidth
    );
    const height = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
    );

    const checkMot = () => {
        const mot = (document.getElementById("mot") as HTMLInputElement).value;

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "equipeId": getLocalStorage("equipeId"),
            "defiId": getLocalStorage("defiId"),
            "mot": mot
        });

        fetch(process.env.REACT_APP_URL_BACK + "/api/equipe/mot", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                if (result) {
                    setConfetti(true);
                    setMauvaiseReponse(false);
                    if (getLocalStorage("temps-mot") === null) {
                        setLocalStorage("temps-mot", Date.now().toString());
                    }
                } else {
                    setMauvaiseReponse(true);
                    setConfetti(false);
                    setTimeout(() => {
                        setMauvaiseReponse(false);
                    }, 500);
                }
            })
            .catch(error => console.log('error', error));


    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (!confetti && !mauvaiseReponse) {
                checkMot();
            }
        }
    };

    let defiQrCodeBegin = false;
    const nbQrCodeString = getLocalStorage("nbQrCode");
    let nbQrCode = 7;
    try {
        nbQrCode = parseInt(nbQrCodeString);
    } catch (error) {
        console.log(error);
    }

    for (let i = 1; i < nbQrCode; i++) {
        const localStorage = getLocalStorage("QrCode-" + i);
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
            <input type="text" id="mot" name="mot" placeholder="Tapez votre mot ici" onKeyDown={handleKeyDown}/>
            <div style={{width: "100vw"}}></div>
            <div style={mauvaiseReponse || confetti ? {display: "none"} : {}}>
                <button type="button" onClick={checkMot}
                        style={{height: "40px", padding: "0 10px", borderRadius: "10px"}}>Vérifier
                </button>
            </div>
            {confetti && <Confetti width={width} height={height}/>}
        </div>
    )
}


const Avancee: FC = () => {
    // Synchronisation des cookies avec l'API de l'équipe
    useEffect(() => {
        const equipeId = getLocalStorage("equipeId");
        if (getCookieConsentValue("cookieConsent") && equipeId !== null) {
            fetch(process.env.REACT_APP_URL_BACK + "/api/qrcode/" + equipeId, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(qrCodes => {
                    qrCodes.forEach((qrCode) => {
                        setLocalStorage("QrCode-" + qrCode.number, JSON.stringify({
                            "mot": qrCode.indice,
                            "url": window.location.origin + "/" + qrCode.idQrCode,
                            "timestamp": Date.parse(qrCode.date)
                        }))
                    })
                })
                .catch(error => console.log('error', error));
        }
    }, [])

    return (
        <div>
            <h3 style={{textAlign: "center", color: "white", marginTop: "40px"}}>Pour terminer la course et obtenir
                votre score.<br/>Vous devez scanner <u>tous</u> les <span style={{color: "#fe6928"}}>QrCode</span>&nbsp;
                <u>et</u> trouver le <span
                    style={{color: "#fe6928"}}>mot caché</span>.<br/><br/>Avancée: <FontAwesomeIcon icon={faRotate}
                                                                                                    onClick={() => deleteLocalStorage("Etes-vous sûre de vouloir réinitialiser votre progressions ? (Si vous faîtes parti d'une équipe, cela vous déconnectera de celle-ci et ne supprimera pas son avancement)")}
                                                                                                    style={{cursor: "pointer"}}/>
            </h3>
            <ProgressResult/><InputMot/> <TempsParcours/>
        </div>
    )
}

export default Avancee
