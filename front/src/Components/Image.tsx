import React, {FC, useState} from 'react';

async function doesFileExist(urlToFile: string): Promise<boolean> {
    try {
        const response = await fetch(urlToFile, {method: 'HEAD'});
        const contentType = response.headers.get('Content-Type') || '';
        return response.ok && contentType.split("/")[0] === "image";
    } catch (error) {
        console.error(error);
        return false;
    }
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
            <h4 style={{textAlign: "center", color: "white", marginTop: "40px"}}>L'image arrive bientôt 😉, voici un
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
    const [fileExist, setFileExist] = useState(true)
    doesFileExist(src)
        .then((result) => {
            if (!result) {
                setFileExist(false)
            }
        })
        .catch((error) => {
            setFileExist(false)
        })
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
