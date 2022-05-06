import React from 'react';
import PropTypes from "prop-types"

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    return xhr.status !== 404;
}

const AttenteImage = (props) => {
    return (
        <div>
        <h4 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>L'image arrive
            bientôt 😉, voici un petit indice en attendant:</h4>
            <p>{props.alt}</p>
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
    return (
        <div>
            {fileExist && (
                <div style={{textAlign: "center"}}>
                    {/*<p>{props.alt}</p>*/}
                    <img src={props.src} alt={props.alt}/>
                </div>
            )}
            {!fileExist && (
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
        alt: PropTypes.string.isRequired
    }

Image.defaultProps =
    {
        src: "",
        alt: ""
    }

export default Image
