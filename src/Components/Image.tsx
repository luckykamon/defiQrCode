import React, {FC} from 'react';

function doesFileExist(urlToFile: string): boolean {
    let xhr = new XMLHttpRequest();
    xhr.open('HEAD', urlToFile, false);
    xhr.send();
    let mimeType = xhr.getResponseHeader('Content-Type') || '';
    return xhr.status !== 404 && mimeType.split("/")[0] === "image";
}

interface AttenteImageProps {
    /**
     * La description de l'image
     */
    alt: string;
}

const AttenteImage: FC<AttenteImageProps> = ({alt}) => {
    return (
        <div>
            <h4 style={{textAlign: "Center", color: "white", marginTop: "40px"}}>L'image arrive bientôt 😉, voici un
                petit indice en attendant:</h4>
            <p style={{textAlign: "center", fontWeight: "bold", fontSize: "18px"}}>{alt}</p>
        </div>
    );
};

AttenteImage.defaultProps = {
    alt: ""
};

interface ImageProps {
    /**
     * L'url de l'image
     */
    src: string;
    /**
     * La description de l'image
     */
    alt: string;
    /**
     * La priorité de l'image
     */
    lazy?: boolean;
}

const Image: FC<ImageProps> = ({src, alt}) => {
    let fileExist = doesFileExist(src);
    let src_original = src.split(".")[0] + "_original." + src.split(".")[1];
    return (
        <div>
            {fileExist && (
                <div style={{textAlign: "center"}}>
                    <a href={src_original} download> <img src={src} alt={alt}/> </a>
                </div>
            )} {!fileExist && (
            <AttenteImage alt={alt}/>
        )}
        </div>
    );
};

Image.defaultProps = {
    src: "",
    alt: "",
    lazy: false
};

export default Image;
