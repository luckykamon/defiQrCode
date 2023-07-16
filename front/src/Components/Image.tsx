import React, {FC, useState} from 'react';

interface AttenteImageProps {
    /**
     * La description de l'image
     */
    alt: string;
}

const AttenteImage: FC<AttenteImageProps> = ({alt}) => {
    return (
        <div>
            <h4 style={{textAlign: "center", color: "white", marginTop: "40px"}}>L&apos;image arrive bientôt 😉, voici la description de l&apos; en attendant:</h4>
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
    const [onError, setOnError] = useState(false)
    const src_original = src.split(".")[0] + "_original." + src.split(".")[1];

    return (
        <div>
            {!onError && (
                <div style={{textAlign: "center"}}>
                    <a href={src_original} download target="_blank" rel="noreferrer"> <img src={src} alt={alt} onError={() => setOnError(true)}/> </a>
                </div>
            )} {onError && (
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
