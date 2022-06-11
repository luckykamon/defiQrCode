import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QrCodeResult from "./Components/QrCodeResult"
import {
    Etape0,
    Etape1,
    Etape2,
    Etape3,
    Etape4,
    Etape5,
    Etape6,
    Etape7,
    Etape8,
    Etape9,
    Etape10,
    Etape11
} from "./Components/Etapes"
import About from "./Components/About";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import QrCodeSoluce from "./Components/solution";


const Confidentialite = () => {

    return (
        <div>
            <NavBar page=""/>
            <div style={{textAlign: "center", margin: "20px"}}>
                <h3 style={{color: "white", marginTop: "40px"}}>Politique de Confidentialité:</h3>
                <p>Ce site enregistre dans localStorage les numéros des QrCodes scannés ainsi que la date du premier accès à l'url, le mot associé au QrCode et l'url du du QrCode.</p>
                <p>Les données enregistrés dans localStorage ont pour unique but d'aider l'utilisateur dans son parcours de course d'orientation.</p>
                <p>Pour toutes questions/remarques/autres vous pouvez me contacter par mail: <a href="mailto:lucas.bodin.contacter@gmail.com">lucas.bodin.contacter@gmail.com</a></p>
            </div>
            <Footer/>
        </div>
    )
}

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<About/>}/>
            <Route path="confidentialite" element={<Confidentialite/>}/>
            <Route path="QrCodeResult" element={<QrCodeResult/>}/>
            <Route path="solution" element={<QrCodeSoluce/>}/>
            <Route path="etape_0" element={<Etape0/>}/>
            <Route path="nq20CjprDksS" element={<Etape1/>}/>
            <Route path="U6BeT2kldxeY" element={<Etape2/>}/>
            <Route path="ZFw1bKuekyNl" element={<Etape3/>}/>
            <Route path="lBVt7ypM5oPa" element={<Etape4/>}/>
            <Route path="Gnbo5WHSB20C" element={<Etape5/>}/>
            <Route path="qQdbfyALH9Nz" element={<Etape6/>}/>
            <Route path="q7ZqAEY7nqYQ" element={<Etape7/>}/>
            <Route path="96vSXCMPHfVZ" element={<Etape8/>}/>
            <Route path="e8EP7hPTDgYT" element={<Etape9/>}/>
            <Route path="2dntPyEx7Et9" element={<Etape10/>}/>
            <Route path="ezMyOYo0X2De" element={<Etape11/>}/>
            <Route path="*" element={<About/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

