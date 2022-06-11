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
                            <p>L'objectif est de réussir à trouver la phrase cachée en partant du <a href="/etape_0">point
                                de départ (cliquez ici)</a>. Point de départ où il faudra scanner le QrCode permettant
                                d'accéder à un mot de la phrase cachée et contenant plusieurs indices vers le prochain QrCode.
                                Et ainsi de suite... jusqu'à ce que la phrase cachée soit révélée 🎁</p>
                            <p>Chaque QrCode se situe à moins de 20m maximum du parcours que vous pouvez télécharger
                                ci-dessous.</p>
                            <p>Si vous acceptez les cookies, vous pourrez consulter <a href="/QrCodeResult">votre avancée (cliquez ici)</a> qui se complètera automatiquement.</p>
                            <p>Cet évènement à eu lieu le 10 juin 2022 avec le groupe facebook <a href={"https://www.facebook.com/events/1711141272566796/?acontext=%7B%22event_action_history%22%3A[%7B%22surface%22%3A%22group%22%7D]%7D"} target={"_blank"}>Courir à Plusieurs</a></p>
                            <div className="row">
                                <div className="columns download" style={{width: "100%"}}>
                                    <span className="button" onClick={openGpxDownload} style={{margin: "20px"}}>
                                        <i className="fa fa-download"/>Télécharger le GPX
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
