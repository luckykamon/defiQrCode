import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import {getLocalStorage} from "../Functions/LocalStorage";
import QRCode from "react-qr-code";
import { useParams } from 'react-router-dom';

const Layout = (props) => {
    return (
        <div>
            <NavBar page="/equipe"/> {props.children} <Footer/>
        </div>
    )
}

const Equipe = () => {
    const { id } = useParams();
    const createEquipe = () => {
        const equipeName = document.getElementById("equipeName") as HTMLInputElement
        const equipeNameValue = equipeName.value
        if (equipeNameValue === "") {
            alert("Veuillez entrer un nom d'équipe valide")
            return
        }
        fetch(process.env.REACT_APP_URL_BACK + "/api/equipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: equipeNameValue
            })
        }).then((response) => {
            if (response.status === 200) {
                return response.json()
            } else {
                alert("Une erreur est survenue lors de la création de votre équipe.")
            }
        }).then((data) => {
            if (data !== undefined) {
                localStorage.setItem("equipeId", data._id)
                localStorage.setItem("equipeName", data.name)
                let textQrCode = window.location.origin + "/equipe/" + data._id
                localStorage.setItem("equipeURL", textQrCode)
                window.location.reload()
            } else {
                alert("Une erreur est survenue lors de la création de votre équipe.")
            }
        })
    }
    const shareLink = (equipeUrl) => {
        const shareNavigator = () => {
            return new Promise((resolve, reject) => {
                if (navigator.share) {
                    navigator.share({url: equipeUrl})
                        .then(() => {
                            resolve("Partage réussi par navigator.share")
                        })
                        .catch(() => {
                            reject()
                        })
                } else {
                    reject()
                }
            })
        }
        const shareClipbopard = () => {
            return new Promise((resolve, reject) => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(equipeUrl)
                        .then(() => {
                            resolve("Partage réussi par navigator.clipboard")
                        })
                        .catch(() => {
                            reject()
                        })
                } else {
                    reject()
                }
            })
        }

        shareNavigator()
            .then((result) => {
              console.log(result)
            })
            .catch(() => {
                shareClipbopard()
                    .then((result) => {
                        console.log(result)
                    })
                    .catch(() => {
                        console.log("Partage échoué par navigator.share et navigator.clipboard")
                    })
            })
    }

    let equipeId = getLocalStorage("equipeId")
    let equipeName = getLocalStorage("equipeName")
    let equipeURL = localStorage.getItem("equipeURL")
    if (equipeId === null || equipeName === null || equipeURL === null) {
        if (id !== undefined) {
            fetch(process.env.REACT_APP_URL_BACK + "/api/equipe/" + id, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    alert("Une erreur est survenue lors de la récupération de votre équipe.")
                }
            }).then((data) => {
                if (data !== undefined) {
                    localStorage.setItem("equipeId", data._id)
                    localStorage.setItem("equipeName", data.name)
                    let textQrCode = window.location.origin + "/equipe/" + data._id
                    localStorage.setItem("equipeURL", textQrCode)
                    window.location.href = "/equipe"
                } else {
                    alert("Une erreur est survenue lors de la récupération de votre équipe.")
                }
            })
            return (
                <Layout>
                    <h3 style={{textAlign: "center", color: "white", marginTop: "40px"}}>Chargement de votre équipe en
                        cours...</h3>
                </Layout>
            )
        }
        return (
            <Layout>
                <h3 style={{textAlign: "center", color: "white", marginTop: "40px"}}><p>Scannez votre numéro d'équipe ou
                    cliquez sur votre lien d'équipe pour en rejoindre une.</p>
                    <p style={{marginTop: "6px"}}>Ou créez votre équipe ci-dessous:</p>
                </h3>
                <div style={{textAlign: "center", margin: "auto"}}>
                    <input type="text" id="equipeName" placeholder="Entrez votre nom d'équipe"
                           style={{height: "40px", borderRadius: "10px", margin: "auto"}}/>
                    <p style={{margin: "10px"}}></p>
                    <button type="button" style={{height: "40px", padding: "0 10px", borderRadius: "10px"}}
                            onClick={createEquipe}>Créer votre Équipe
                    </button>
                </div>

            </Layout>
        )
    } else {
        return (
            <div>
                <Layout>
                    <h3 style={{textAlign: "center", color: "white", marginTop: "40px"}}>
                        <p>Vous êtes l'équipe: {equipeName}</p>
                        <p>Envoyez l'url ci-dessous aux membres de votre équipe pour synchroniser votre avancée ou
                            faîtes-leurs scanner le QrCode:</p>
                        <div style={{textAlign: "center", margin: "10px"}} onClick={() => shareLink(equipeURL)}>
                            <a href={equipeURL}>{equipeURL}</a> <br/> <QRCode value={equipeURL} style={{marginTop: "25px"}}/>
                        </div>

                    </h3>
                </Layout>
            </div>
        )
    }
}

export default Equipe
