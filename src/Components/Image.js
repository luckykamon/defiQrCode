import React from 'react';
import PropTypes from "prop-types"

function doesFileExist(urlToFile) {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    // Récupère le mime type
    let mimeType = xhr.getResponseHeader('Content-Type');
    console.log(mimeType.split("/")[0]);
    return xhr.status !== 404 && mimeType.split("/")[0] === "image";
}

const AttenteImage = (props) => {
    return (
        <div>
            <h4 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>L'image arrive bientôt 😉, voici un
                petit indice en attendant:</h4>
            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>{props.alt}</p>
        </div>
    )
}

AttenteImage.propTypes =
    {
        /**
         * La description de l'image
         */
        alt: PropTypes.string.isRequired
    }

AttenteImage.defaultProps =
    {
        alt: ""
    }

const Image = (props) => {

    let fileExist = doesFileExist(props.src)
    let src_original = props.src.split(".")[0] + "_original." + props.src.split(".")[1]
    return (
        <div>
            {fileExist && (
                <div style={{textAlign: "center"}}>
                    <a href={src_original} download> <img src={props.src} alt={props.alt}/> </a>
                </div>
            )} {!fileExist && (
            <AttenteImage alt={props.alt}/>
        )}

        </div>
    )
}

Image.propTypes =
    {
        /**
         * L'url de l'image
         */
        src: PropTypes.string.isRequired,
        /**
         * La description de l'image
         */
        alt: PropTypes.string.isRequired,
        /**
         * La priorité de l'image
         */
        lazy: PropTypes.bool
    }

Image.defaultProps =
    {
        src: "",
        alt: ""
    }

export default Image
