import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Avancee from "./Pages/Avancee"
import {Etape0, Etape1, Etape2, Etape3, Etape4, Etape5, Etape6,} from "./Components/Etapes"
import About from "./Pages/About";
import NavBar from "./Layout/Navbar";
import Footer from "./Layout/Footer";
import Equipe from "./Pages/Equipe";

const Confidentialite = () => {
    return (
        <div>
            <NavBar page=""/>
            <div style={{textAlign: "center", margin: "20px"}}>
                <h3 style={{color: "white", marginTop: "40px"}}>Politique de Confidentialité:</h3>
                <p>Ce site enregistre dans localStorage les numéros des QrCodes scannés ainsi que la date du premier
                    accès à l'url, le mot associé au QrCode et l'url du du QrCode.</p>
                <p>Les données enregistrés dans localStorage ont pour unique but d'aider l'utilisateur dans son parcours
                    de course d'orientation.</p>
                <p>Ce site enregistre l'avancée dans sa base de donnée afin de la synchroniser entre tout les utilisateurs d'une même équipe.</p>
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
            <Route path="etape_0" element={<Etape0/>}/>
            <Route path="LYUpKr6Jwp5J" element={<Etape1/>}/>
            <Route path="MFCJd5deG2LZ" element={<Etape2/>}/>
            <Route path="PLb8tfxH6Ngj" element={<Etape3/>}/>
            <Route path="4HIQ7L8B1Ppx" element={<Etape4/>}/>
            <Route path="DcB423kQ8MW2" element={<Etape5/>}/>
            <Route path="Z2pkN69lkPTC" element={<Etape6/>}/>
        <Route path="*" element={<About/>}/> </Routes> </BrowserRouter>
);

