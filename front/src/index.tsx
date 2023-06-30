import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Avancee from "./Pages/Avancee"
import Etapes from "./Pages/Etapes"
import About from "./Pages/About";
import NavBar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Equipe from "./Pages/Equipe";
import CreateDefiQrCode from "./Pages/createDefiQrCode";

const Confidentialite = () => {
    return (
        <div>
            <NavBar page=""/>
            <div style={{textAlign: "center", margin: "20px"}}>
                <h3 style={{color: "white", marginTop: "40px"}}>Politique de Confidentialité:</h3>
                <p>Ce site enregistre dans localStorage les numéros des QrCodes scannés ainsi que la date du premier
                    accès à l&apos;url, le mot associé au QrCode et l&apos;url du du QrCode.</p>
                <p>Les données enregistrés dans localStorage ont pour unique but d&apos;aider l&apos;utilisateur dans son parcours
                    de course d&apos;orientation.</p>
                <p>Ce site enregistre l&apos;avancée dans sa base de donnée afin de la synchroniser entre tout les utilisateurs d&apos;une même équipe.</p>
                <p>Pour toutes questions/remarques/autres vous pouvez me contacter par mail: <a
                    href="mailto:lucas.bodin.contacter@gmail.com">lucas.bodin.contacter@gmail.com</a></p>
            </div>
            <Footer/>
        </div>
    )
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<About/>}/>
            <Route path="confidentialite" element={<Confidentialite/>}/>
            <Route path="avancee" element={<Avancee/>}/>
            {/*<Route path="solution" element={<QrCodeSoluce/>}/>*/}
            <Route path="equipe" element={<Equipe/>}/>
            <Route path="equipe/:id" element={<Equipe/>}/>
            <Route path="create" element={<CreateDefiQrCode/>}/>
            <Route path=":idQrCode" element={<Etapes/>}/>
        </Routes>
    </BrowserRouter>
);
