import React, {FC, MouseEventHandler} from "react";

const About: FC = () => {

    const openGpxDownload: MouseEventHandler<HTMLSpanElement> = () => {
        window.open('/gpx/chien_gayeulles.gpx')
    }

    return (
        <div>
            <section id="about">
                <div className="row">
                    <div className="three columns">
                        <img className="profile-pic" src="/images/carte_parc_gayeulles.jpg"
                             alt="Lucas Bodin Profile Pic"/>
                    </div>
                    <div className="nine columns main-col" style={{textAlign: "justify"}}>
                        <h2 style={{textAlign: "center"}}>Le défi QrCode</h2>

                        <p>Le défi QrCode est une course d&apos;orientation se situant dans le parc des Gayeulles à
                            Rennes.</p>
                        <p>L&apos;objectif est de réussir à trouver le mot caché en partant du <a href="/etape_0">point de
                            départ (cliquez ici)</a>. Point de départ où il faudra scanner le QrCode permettant
                            d&apos;accéder à un indice du mot caché et contenant plusieurs indices vers le prochain QrCode.
                            Et ainsi de suite... afin de trouver le mot 🎁</p>
                        <p>Chaque QrCode se situe à moins de 20m maximum du parcours que vous pouvez télécharger
                            ci-dessous.</p>
                        <p>Si vous acceptez les cookies, vous pourrez consulter <a href="/avancee">votre avancée
                            (cliquez ici)</a> qui se complètera automatiquement.</p>
                        <p>Cet évènement a eu lieu le 3 juin 2023 avec le groupe facebook <a
                            href={"https://fb.me/e/5xzzDJfAp"} target={"_blank"} rel={"noreferrer"}>Courir à
                            Plusieurs</a></p>
                        <div className="row">
                            <div className="columns download" style={{width: "100%", textAlign: "center"}}>
                                <span className="button" onClick={openGpxDownload} style={{margin: "20px"}}>
                                    Télécharger le fichier lié au parcours
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}


export default About;
