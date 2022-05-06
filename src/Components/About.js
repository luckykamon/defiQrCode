import React, {Component} from "react";
import Fade from "react-reveal";
// import {Browser} from '@capacitor/browser';
// import {DocumentViewer} from "@awesome-cordova-plugins/document-viewer";
// import Slide from "react-reveal";

class About extends Component {
    render() {
        if (!this.props.data) return null;

        const name = this.props.data.name;
        const profilepic = "images/" + this.props.data.image;
        const bio = this.props.data.bio;
        const phone = this.props.data.phone;
        const email = this.props.data.email;
        // const resumeDownload = this.props.data.resumedownload
        const openGpxDownload = () => {
            window.open('/gpx/chien_gayeulles.gpx')
        }

        return (
            <section id="about">
                <Fade bottom duration={1500}>
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

                            <p>Le défi QrCode est une course d'orientation se situant dans le parc des Gayeulles à Rennes qui a lieu le samedi 30 avril 2022.</p>
                            <p>L'objectif est de réussir à trouver la phrase cachée en partant du <a href="/viewGayeulles">point de départ (cliquez ici)</a>. Point de départ où il faudra scanner le QrCode permettant d'accéder à un mot de la phrase cachée et contenant une énigme vers le prochain QrCode. Et ainsi de suite... jusqu'à ce que la phrase cachée soit révélée 🎁</p>
                            <p>Chaque QrCode se situe à moins de 10m maximum du parcours que vous pouvez télécharger ci-dessous.</p>
                            <p>Pour participer, vous avez la possibilité de vous créer une équipe (juste ici) qui vous permettra d'obtenir un code d'équipe à entrer afin de suivre votre avancée en temps réel (sur cette page) et d'obtenir un classement final.</p>
                            <div className="row">
                                <div className="columns download" style={{width: "100%"}}>
                                    <span className="button" onClick={openGpxDownload} style={{margin: "20px"}}>
                                        <i className="fa fa-download"/>Télécharger le GPX
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </section>
        );
    }
}

export default About;
