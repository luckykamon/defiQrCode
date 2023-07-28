import {FC, MouseEventHandler, useEffect, useState} from "react";
import {getLocalStorage} from "../Functions/LocalStorage";
import SkeletonCustom from "../Components/SkeletonCustom";
import 'react-loading-skeleton/dist/skeleton.css';

const About: FC = () => {
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [image, setImage] = useState(null);
    const [fichier, setFichier] = useState(null);

    useEffect(() => {
        fetch(process.env.REACT_APP_URL_BACK + "/api/defi/" + getLocalStorage("defiId"), {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                setName(result.name);
                setDescription(result.description);
                setImage(result.image);
                setFichier(result.fichier);
            })
            .catch(error => console.log('error', error));
    }, []);

    const openGpxDownload: MouseEventHandler<HTMLSpanElement> = () => {
        window.open(process.env.REACT_APP_URL_BACK + fichier.path, '_blank');
    };

    return (
        <div>
            <section id="about">
                <div className="row">
                    <div className="three columns" style={{textAlign: "center"}}>
                        {!image && <SkeletonCustom circle={true} height="150px" width="150px"/>} {image && (
                        <img className="profile-pic" src={process.env.REACT_APP_URL_BACK + image.path}
                             alt={image.alt}/>)}
                    </div>
                    <br/>
                    <div className="nine columns main-col" style={{textAlign: "justify"}}>
                        <h2 style={{textAlign: "center", ...(!image ? {paddingLeft: "25%", paddingRight: "25%"}: {})}}>{name || <SkeletonCustom/>}</h2><br/>{
                        !description && <SkeletonCustom count={10}/>
                    } {description && description.split("\n").map((item, key) => {
                        return <p key={key}>{item}</p>;
                    })}
                        <br/>
                        <div className="row">
                            <div className="columns download" style={{width: "100%", textAlign: "center", ...(!fichier ? {paddingLeft: "25%", paddingRight: "25%"}: {})}}>
                                {!fichier && <SkeletonCustom height={"50px"}/>} {fichier && (
                                <span className="button" onClick={openGpxDownload} title={fichier.alt} style={{margin: "20px"}}>
                                    Télécharger le fichier lié au parcours
                                </span>
                            )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};


export default About;
