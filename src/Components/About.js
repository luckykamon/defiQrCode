import React from "react";
import NavBar from "./Navbar";
import Footer from "./Footer";

const About = () => {

    const openGpxDownload = () => {
        window.open('/gpx/chien_gayeulles.gpx')
    }

    // noinspection HtmlUnknownTarget
    return (
        <div>
            <NavBar page="/"/>
            <section id="about">
                {/*<Fade bottom duration={1500}>*/}
                    <div className="row">
                        <div className="three columns">
                            <img
                                className="profile-pic"
                                src="images/carte_parc_gayeulles.jpg"
                                alt="Lucas Bodin Profile Pic"
                            />
                        </div>
                        <div className="nine columns main-col">
                            <h2>Le défi QrCode</h2>

                            <p>Le défi QrCode est une course d'orientation se situant dans le parc des Gayeulles à
                                Rennes.</p>
                            <p>L'objectif est de réussir à trouver le mot caché en partant du <a href="/etape_0">point
                                de départ (cliquez ici)</a>. Point de départ où il faudra scanner le QrCode permettant
                                d'accéder à un indice du mot caché et contenant plusieurs indices vers le prochain QrCode.
                                Et ainsi de suite... afin de trouver le mot 🎁</p>
                            <p>Chaque QrCode se situe à moins de 20m maximum du parcours que vous pouvez télécharger
                                ci-dessous.</p>
                            <p>Si vous acceptez les cookies, vous pourrez consulter <a href="/QrCodeResult">votre avancée (cliquez ici)</a> qui se complètera automatiquement.</p>
                            <p>Cet évènement à eu lieu le 3 juin 2023 avec le groupe facebook <a href={"https://fb.me/e/5xzzDJfAp"} target={"_blank"} rel={"noreferrer"}>Courir à Plusieurs</a></p>
                            <div className="row">
                                <div className="columns download" style={{width: "100%"}}>
                                    <span className="button" onClick={openGpxDownload} style={{margin: "20px"}}>
                                        Télécharger le GPX
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                {/*</Fade>*/}
            </section>
            <Footer/>
        </div>
    );
}


export default About;
