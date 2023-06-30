import React, {FC, useEffect, useState} from 'react';
import AffichageEtape from "../Components/AffichageEtape"
import Image from "../Components/Image";
import {useParams} from "react-router-dom";
import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const Etapes: FC = () => {
    const [qrCode, setQrCode] = useState(null)
    const [status, setStatus] = useState("loading")
    const {idQrCode} = useParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_BACK + "/api/qrcode/getInfo/" + idQrCode, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => {
                if (response.status !== 200) {
                    setStatus("badId")
                } else {
                    return response.json(); // Ici on retourne la promesse de response.json()
                }
            })
            .then(data => {
                if (data) {  // On vérifie si data existe car dans le cas où le status n'est pas 200, data sera undefined
                    setQrCode(data)
                    setStatus("success")
                }
            })
            .catch(error => {
                console.log(error)
                setStatus("error")
            });
    }, [])


    if (status === "loading") {
        return (<>
            <NavBar page="/etape_0"/>
            <div style={{textAlign: "center"}}>Vérification du QrCode en cours...</div>
            <Footer/>
        </>)
    } else if (status === "error") {
        return (<>
            <NavBar page="/etape_0"/>
            <div style={{textAlign: "center"}}>Une erreur est survenue lors de la vérification du QrCode</div>
            <Footer/>
        </>)
    } else if (status === "badId") {
        return (<>
            <NavBar page="/etape_0"/>
            <div style={{textAlign: "center"}}>Le QrCode que vous scanné n&apos;existe pas</div>
            <Footer/>
        </>)
    }

    return (
        <AffichageEtape nbQrCode={qrCode.number} mot={qrCode.indice} hideFooter>
            {qrCode.listImage.map((imageInfo) => {
                let urlImage = process.env.REACT_APP_URL_BACK + imageInfo.path
                if (imageInfo.path.startsWith("http")) {
                    urlImage = imageInfo.path
                }
                return <Image key={imageInfo.path} src={urlImage}
                              alt={imageInfo.alt} lazy={true}/>
            })} </AffichageEtape>
    )
}

export default Etapes
