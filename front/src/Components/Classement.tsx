import {FC, useEffect, useState} from "react";
import {getLocalStorage} from "../Functions/LocalStorage";

const getClassement = () => {
    return new Promise((resolve, reject) => {
        fetch(process.env.REACT_APP_URL_BACK + "/api/equipe/classement/" + getLocalStorage("equipeId"), {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                resolve(result)
            })
            .catch(error => {
                reject(error)
            });
    })
}

const ResultClassement: FC = () => {
    const exempleDataClassement = [
        {
            "nameEquipe": "Exemple nom equipe",
            "nbQrCode": 2,
            "score": null,
            "isMyEquipe": false,
            "motTrouve": false
        }]

    const [dataClassement, setDataClassement] = useState(exempleDataClassement);

    useEffect(() => {
        getClassement()
            .then((result: Array<object>) => {
                let newDataClassement = [...exempleDataClassement]; // Crée une copie du tableau original

                result.sort((a: {
                    nameEquipe: string,
                    nbQrCode: number,
                    score: number | null,
                    isMyEquipe: boolean,
                    motTrouve: boolean
                }, b: {
                    nameEquipe: string,
                    nbQrCode: number,
                    score: number | null,
                    isMyEquipe: boolean,
                    motTrouve: boolean
                }) => {
                    // Tri en fonction du score, nulle après
                    if (a.score === null && b.score !== null) return 1;
                    if (a.score !== null && b.score === null) return -1;
                    if (a.score !== null && b.score !== null) {
                        if (a.score < b.score) return 1;
                        if (a.score > b.score) return -1;
                    }

                    // Si le score est le même ou nul, trier par nbQrCode
                    if (a.nbQrCode < b.nbQrCode) return 1;
                    if (a.nbQrCode > b.nbQrCode) return -1;

                    // Si nbQrCode est le même, trier par motTrouve
                    if (a.motTrouve < b.motTrouve) return 1;
                    if (a.motTrouve > b.motTrouve) return -1;

                    return 0; // Si tout est le même
                }).forEach((equipe: {
                    nameEquipe: string,
                    nbQrCode: number,
                    score: number | null,
                    isMyEquipe: boolean,
                    motTrouve: boolean
                }) => {
                    newDataClassement.push({
                        "nameEquipe": equipe.nameEquipe,
                        "nbQrCode": equipe.nbQrCode,
                        "score": equipe.score,
                        "isMyEquipe": equipe.isMyEquipe,
                        "motTrouve": equipe.motTrouve
                    });
                });

                setDataClassement(newDataClassement);

            })
            .catch((error) => {
                console.log(error)
            })
    }, [exempleDataClassement])

    let nbEquipe = 0

    return (
        <tbody>
        {dataClassement.map((equipe: {
            nameEquipe: string,
            nbQrCode: number,
            score: number | null,
            isMyEquipe: boolean,
            motTrouve: boolean
        }) => {
            nbEquipe++
            return (
                <tr key={nbEquipe} className={equipe.isMyEquipe ? "isMyEquipe" : null}>
                    <td>{equipe.nameEquipe}</td>
                    <td>{equipe.nbQrCode}</td>
                    <td>{equipe.motTrouve ? "oui" : "non"}</td>
                    <td>{equipe.score ? equipe.score : "En course"}</td>
                </tr>
            )
        })}
        </tbody>
    )
}

const DisplayClassement: FC = () => {
    return (
        <table style={{textAlign: "center", width: "100%"}} id="ex2-grid" role="grid" aria-labelledby="grid2Label"
               className="data">
            <thead>
            <tr>
                <th style={{width: "25%"}}>Equipe</th>
                <th style={{width: "25%"}}>QrCodes trouvés</th>
                <th style={{width: "25%"}}>Mot trouvé</th>
                <th style={{width: "25%"}}>Score</th>
            </tr>
            </thead>
            <ResultClassement/>
        </table>
    )
}

const Classement = () => {
    return (
        <div>
            <h2 style={{textAlign: "center", color: "white", marginTop: "40px"}}>Classement</h2>
            <DisplayClassement/>
        </div>
    )
}

export default Classement
