import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QrCodeResult from "./Components/QrCodeResult"
import {
    Etape_0,
    Etape_1,
    Etape_2,
    Etape_3,
    Etape_4,
    Etape_5,
    Etape_6,
    Etape_7,
    Etape_8,
    Etape_9,
    Etape_10,
    Etape_11
} from "./Components/Etapes"
import About from "./Components/About";


const Confidentialite = () => {

    return (
        <div style={{textAlign: "center", margin: "20px"}}>
            <h1 style={{color: "white"}}>Politique de Confidentialite:</h1>
            <p>Le site web enregistre les requêtes qui sont envoyés par l'utilisateur afin de déterminer l'avancée des
                utilisateurs dans la course d'orientation. Un traitement humain et automatique pourra être effectué afin
                de vérifier la validitée des données (Vérification des horaires de scan des QrCode plausibles par
                exemple ou autres anomalies pouvant être constaté).</p>
            <p>Une fois la course d'orientation terminée, un classement des équipes participantes sera publié sur le
                groupe facebook <a href="https://www.facebook.com/groups/couriraplusieurs" target="_blank">Courir à
                    plusieurs</a>. Les participants auront alors la possibilitée de lever leur pseudonyme.</p>
        </div>
    )
}


ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<About/>}/>
            <Route path="confidentialite" element={<Confidentialite/>}/>
            <Route path="QrCodeResult" element={<QrCodeResult/>}/>
            <Route path="etape_0" element={<Etape_0/>}/>
            <Route path="nq20CjprDksS" element={<Etape_1/>}/>
            <Route path="U6BeT2kldxeY" element={<Etape_2/>}/>
            <Route path="ZFw1bKuekyNl" element={<Etape_3/>}/>
            <Route path="lBVt7ypM5oPa" element={<Etape_4/>}/>
            <Route path="Gnbo5WHSB20C" element={<Etape_5/>}/>
            <Route path="qQdbfyALH9Nz" element={<Etape_6/>}/>
            <Route path="q7ZqAEY7nqYQ" element={<Etape_7/>}/>
            <Route path="96vSXCMPHfVZ" element={<Etape_8/>}/>
            <Route path="e8EP7hPTDgYT" element={<Etape_9/>}/>
            <Route path="2dntPyEx7Et9" element={<Etape_10/>}/>
            <Route path="ezMyOYo0X2De" element={<Etape_11/>}/>
            <Route path="*" element={<About/>}/>
        </Routes>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
