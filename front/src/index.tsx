import React, {FC} from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Avancee from "./Pages/Avancee";
import Etapes from "./Pages/Etapes";
import About from "./Pages/About";
import Confidentialite from "./Pages/Confidentialite";
import Equipe from "./Pages/Equipe";
import CreateDefiQrCode from "./Pages/createDefiQrCode";
import NavBar from "./Layout/Navbar";
import Footer from "./Layout/Footer";


const Layout: FC = ({children}) => {
    return (
        <>
            <NavBar/> {children} <Footer/>
        </>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Layout> <BrowserRouter> <Routes> <Route path="/" element={<About/>}/> <Route path="confidentialite"
                                                                                  element={<Confidentialite/>}/> <Route
        path="avancee" element={<Avancee/>}/> <Route path="equipe" element={<Equipe/>}/> <Route path="equipe/:id"
                                                                                                element={
                                                                                                    <Equipe/>}/> <Route
        path="defi" element={<CreateDefiQrCode/>}/> <Route path="defi/:idDefi" element={<CreateDefiQrCode/>}/> <Route
        path=":idQrCode" element={<><Etapes/></>}/> </Routes> </BrowserRouter> </Layout>
);
