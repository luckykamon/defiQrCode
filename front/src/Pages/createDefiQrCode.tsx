import {ButtonHTMLAttributes, FC, InputHTMLAttributes, useEffect, useRef, useState} from 'react';
import Image from "../Components/Image";
import {faFileImport, faPlus, faQrcode, faSpinner, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {v4 as uuidv4} from 'uuid';
import {useParams, useSearchParams} from "react-router-dom"; // Importez la fonction uuid
import {NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {createPdfDefi} from "../Functions/CreatePdfDefi";


export const generateQrCode = ({color, text, fileUrl}) => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('text', window.location.origin + "/" + text);
        formData.append('color', color);

        // Fetch the image file from the provided URL
        fetch(fileUrl)
            .then(response => response.blob())
            .then(blob => {
                // Create a new file instance
                const file = new File([blob], 'filename.png', {type: 'image/png'});
                formData.append('file', file);
                fetch(process.env.REACT_APP_URL_QRCODE + '/uploadQrCode', {
                    method: 'POST',
                    body: formData,
                })
                    .then(response => response.text())
                    .then(result => {
                        resolve(result);
                    })
                    .catch(error => {
                        console.error(error);
                        reject(error);
                    });
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
};

export const ButtonLoad: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({onClick, ...props}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async (e) => {
        if (onClick) {
            setIsLoading(true);
            await onClick(e);
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <button {...props}><FontAwesomeIcon icon={faSpinner} spinPulse/></button>;
    } else {
        return <button {...props} onClick={handleClick}></button>;
    }
};

const CreateDefiQrCode: FC = () => {
    const {idDefi} = useParams();
    const passwordDefi = useSearchParams()[0].get('password');
    const [validateDefiNeed, setValidateDefiNeed] = useState(useSearchParams()[0].get('validateDefi') === 'true');
    const notificationCreate = useSearchParams()[0].get('notificationCreate');

    const initialStep = {
        indice: '',
        images: null,
        message: '',
        idQrCode: 'verification'
    };

    const [steps, setSteps] = useState(new Array(5).fill(null).map(() => ({...initialStep})));
    const [defiName, setDefiName] = useState('');
    const [motCache, setMotCache] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<string | null>(null);
    const [messageGeneral, setMessageGeneral] = useState(null);
    const [isDefiChanged, setIsDefiChanged] = useState(false);

    const allQrcodeAreVerif = () => {
        return !steps.some(step => step.idQrCode === "verification");
    }

    const setQrCodes = (qrCodes) => {
        const newSteps = [];
        let allQrcodeAreVerif = true;
        for (let i = 0; i < qrCodes.sort((a, b) => a.number - b.number).length; i++) {
            newSteps.push({
                indice: qrCodes[i].indice,
                images: qrCodes[i].listImage.map((image) => {
                    return image.path;
                }),
                idQrCode: qrCodes[i].idQrCode
            });
            if (qrCodes[i].idQrCode === "verification") {
                allQrcodeAreVerif = false;
            }
        }
        if (!allQrcodeAreVerif) {
            setMessageGeneral("Votre défi n'as pas encore été vérifié par un administrateur, lorsqu'il le sera il sera publié et vous pourrez obtenir des QR Codes afin de le partager.");
        } else {
            setMessageGeneral(null);
        }
        setSteps(newSteps);
    }

    const setStateFromDefi = (result) => {
        setDefiName(result.name);
        setImage(result.image.path);
        setDescription(result.description);
        setFile(result.fichier.path);
        setMotCache(result.motCache);
        setQrCodes(result.qrCodes);
    }


    const getStepFromDefi = () => {
        if (idDefi !== undefined && passwordDefi !== null) {
            fetch(process.env.REACT_APP_URL_BACK + "/api/defi/" + idDefi + "?password=" + passwordDefi, {
                method: 'GET',
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    setStateFromDefi(result);
                })
                .catch(error => console.log('error', error));
        }
    };

    const uploadImage = (file: File) => {
        return new Promise((resolve, reject) => {
            const formdata = new FormData();
            formdata.append("image", file, file.name);

            fetch(process.env.REACT_APP_URL_BACK + "/api/image", {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            })
                .then(response => {
                    if (response.status !== 200) {
                        console.log('here');
                        reject(response);
                    }
                    return response.text();
                })
                .then(result => {
                    console.log();
                    resolve("/" + result);
                })
                .catch(error => {
                    console.log('error', error);
                    reject(error);
                });
        });

    };

    const updateStepMessage = (index: number, message: string) => {
        const updatedSteps = [...steps];
        updatedSteps[index].message = message;
        setSteps(updatedSteps);
    };

    const checkForm = () => {
        const messages: string[] = [];
        if (!defiName || defiName.length === 0) {
            messages.push('Vous devez saisir un nom de défi.');
        }
        if (image === null) {
            messages.push('Vous devez choisir une image.');
        }
        if (!description || description.length === 0) {
            messages.push('Vous devez saisir une description.');
        }
        if (file === null) {
            messages.push('Vous devez choisir un fichier.');
        }
        if (!motCache || motCache.length === 0) {
            messages.push('Vous devez saisir un mot caché.');
        }
        if (steps.length <= 1) {
            messages.push('Vous devez avoir au moins 2 étapes.');
        }
        for (let stepId = 0; stepId < steps.length; stepId++) {
            if (messageStep(steps[stepId]).length > 0) {
                messages.push("Vous avez des erreurs dans l'étape " + (stepId) + ".");
                updateStepMessage(stepId, messageStep(steps[stepId]).join(' '));
            }
        }
        return messages;
    };

    const messageStep = (updatedStep) => {
        const messages: string[] = [];
        if (updatedStep.indice.length === 0) {
            messages.push('Vous devez saisir un indice.');
        }
        if (updatedStep.images === null || updatedStep.images.length === 0) {
            messages.push('Vous devez choisir au moins une image.');
        }
        if (updatedStep.images?.length > 5) {
            messages.push('Vous ne pouvez pas ajouter plus de 5 images par étape.');
        }
        return messages;
    };

    const handleStepChange = async (index: number, field: string, value: string | FileList) => {
        setIsDefiChanged(true);
        const updatedSteps = [...steps];
        let newValue: string[] | string;
        let messages: string[] = [];

        switch (field) {
            case 'indice':
                if (typeof value !== "string") {
                    return;
                } else {
                    newValue = value;
                }
                break;
            case 'images':
                if (value instanceof FileList) {
                    if (value.length > 5) {
                        messages.push('Seul les 5 premières images ont été prisent en compte.');
                    }
                    newValue = [];
                    for (let nbImage = 0; nbImage < Math.min(5, value.length); nbImage++) {
                        await uploadImage(value.item(nbImage))
                            .then((result) => {
                                if (typeof result === "string" && typeof newValue !== "string") {
                                    newValue.push(result);
                                } else {
                                    throw new Error("La fonction d'upload d'image n'as pas renvoyé un string");
                                }
                            })
                            .catch(() => {
                                return;
                            });
                    }
                } else {
                    return;
                }
                break;
        }
        updatedSteps[index][field] = newValue;
        messages = messages.concat(messageStep(updatedSteps[index]));
        if (messages.length > 0) {
            updatedSteps[index].message = messages.join(' ');
        } else {
            updatedSteps[index].message = '';
        }
        setSteps(updatedSteps);
    };

    const prepareDataDefi = () => {
        const qrcodes = [];
        for (let stepId = 0; stepId < steps.length; stepId++) {
            const listImage = [];
            for (let imageId = 0; imageId < steps[stepId].images.length; imageId++) {
                listImage.push({
                    "name": steps[stepId].images[imageId].split('/').pop(),
                    "path": steps[stepId].images[imageId],
                });
            }
            qrcodes.push({
                "number": stepId,
                "indice": steps[stepId].indice,
                "listImage": listImage
            });
        }

        return JSON.stringify({
            "name": defiName,
            "image": {
                "name": image ? image?.split('/').pop() : null,
                "path": image ? image : null
            },
            "description": description,
            "fichier": {
                "name": file ? file?.split('/').pop() : null,
                "path": file ? file : null
            },
            "motCache": motCache,
            "qrcode": qrcodes
        });
    };

    const updateDefi = () => {
        return new Promise((resolve, reject) => {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = prepareDataDefi();

            fetch(process.env.REACT_APP_URL_BACK + "/api/defi/" + idDefi + "?password=" + passwordDefi, {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                });
        });
    };

    const createDefi = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = prepareDataDefi();

        await fetch(process.env.REACT_APP_URL_BACK + "/api/defi", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                window.location.href = "/defi/" + result._id + "?password=" + result.password + "&notificationCreate=true";
            })
            .catch(error => console.log('error', error));
    };

    const handleDefiPdf = async () => {
        const messages = checkForm();
        if (messages.length > 0) {
            messages.map((message) => {
                NotificationManager.error(message, "Erreur");
            })
            return;
        } else {
            try {
                await createPdfDefi({
                    description: description,
                    file: file,
                    image: image,
                    motCache: motCache,
                    steps: steps,
                    defiName: defiName
                })
                NotificationManager.success('Défi mis à jour avec succès');
            } catch (errot) {
                console.log("error", errot)
                NotificationManager.error('Une erreur est survenue lors de la génération de la feuille de route du défi', "Erreur");
            }
        }
    };

    const handleDefiCreation = async () => {
        const messages = checkForm();
        if (messages.length > 0) {
            messages.map((message) => {
                NotificationManager.error(message, "Erreur");
            })
            return;
        } else if (isCreate()) {
            await createDefi();
        } else if (isUpdate()) {
            await updateDefi()
                .then((result) => {
                    setStateFromDefi(result)
                    setIsDefiChanged(false);
                    NotificationManager.success('Défi mis à jour avec succès');
                })
                .catch((error) => {
                    console.log("error", error)
                    NotificationManager.error('Une erreur est survenue lors de la mise à jour du défi', "Erreur");
                });
        }
    };

    const handleValidateDefi = async () => {
        await fetch(process.env.REACT_APP_URL_BACK + "/api/defi/validate/" + idDefi + "?password=" + passwordDefi, {
            method: 'GET',
            redirect: 'follow'
        })
            .then(response => response.json())
            .then((result) => {
                setStateFromDefi(result)
                NotificationManager.success('Défi validé avec succès');
                setValidateDefiNeed(false);
            })
            .catch(error => {
                console.log('error', error);
                NotificationManager.error('Une erreur est survenue lors de la génération du QR Code', 'Erreur');
            });
    };

    const handleAddStep = () => {
        setIsDefiChanged(true);
        setSteps([...steps, initialStep]);
    };

    const handleRemoveStep = (index: number) => {
        setIsDefiChanged(true);
        if (steps.length <= 2) return NotificationManager.error('Vous devez avoir au moins 2 étapes.', "Erreur");
        if (steps[index].indice !== "" || steps[index].images !== null) { // Si l'étape a déjà un indice ou une image d'ajouté, on ajoute un message de confirmation
            if (confirm('Êtes-vous sûr de vouloir supprimer cette étape ?') === false) return;
        }
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    const addImage = (file) => {
        setIsDefiChanged(true);
        uploadImage(file)
            .then((result: string) => {
                setImage(result);
            });
    };

    const deleteImage = (step, image) => {
        const newSteps = [...steps];
        const newStep = {...step};

        newStep.images = newStep.images.filter((imageStep) => imageStep !== image); // On supprime l'image de notre étape

        const messages = messageStep(newStep);
        if (messages.length > 0) {
            newStep.message = messages.join(' ');
        } else {
            newStep.message = '';
        }
        newSteps[steps.indexOf(step)] = newStep;
        setSteps(newSteps);
    }

    const addFile = (file) => {
        setIsDefiChanged(true);
        uploadImage(file)
            .then((result: string) => {
                console.log(result);
                setFile(result);
            })
            .catch((error) => {
                console.log("error", error)
                NotificationManager.error("Une erreur est survenue lors de l'upload du fichier", "Erreur");
            })
    };

    const InputAddFile: FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
        const uniqueId = uuidv4();  // Générez un ID unique pour chaque instance du composant
        const fileInputRef = useRef<HTMLInputElement>(null); // Créer une référence

        const onButtonClick = () => { // Créer une fonction pour gérer le clic sur le bouton
            fileInputRef.current?.click();
        };
        return (
            <div className="custom-file-upload">
                <input ref={fileInputRef} type="file" id={uniqueId} style={{display: 'none'}} {...props} /> <label
                htmlFor={uniqueId} onClick={onButtonClick}>
                <button className="inner-content">
                    <FontAwesomeIcon icon={faFileImport}/>
                </button>
            </label>
            </div>
        );
    };

    const isUpdate = () => {
        return idDefi && passwordDefi;
    };

    const isCreate = () => {
        return !idDefi || !passwordDefi;
    };

    const handleGenerateQrCode = async (stepId: number) => {
        await generateQrCode({
            color: '#000000',
            text: steps[stepId].idQrCode,
            fileUrl: process.env.REACT_APP_URL_BACK + image
        }).then((nameQrCode: string) => {
            window.open(process.env.REACT_APP_URL_QRCODE + "/getQrCode/" + nameQrCode, '_blank');
        }).catch((error) => {
            console.error(error);
            NotificationManager.error('Une erreur est survenue lors de la génération du QR Code', 'Erreur');
        });

    };

    useEffect(() => {
        getStepFromDefi();
        if (notificationCreate === 'true') {
            NotificationManager.success('Il sera publié une fois validé par un administrateur', 'Défi Créé');
        }
    }, []);

    return (
        <>
            <div style={{textAlign: "center", marginTop: "40px"}}>
                <div style={{display: "block"}}>
                    {idDefi && passwordDefi && (
                        <h1>Modifier un défi</h1>
                    )} {!idDefi || !passwordDefi && (
                    <h1>Modifier un défi</h1>
                )} <br/> {messageGeneral && (
                    <>
                        <p>{messageGeneral}</p>
                    </>
                )} {isUpdate() && (<>
                    <p style={{wordBreak: "break-word"}}>
                        Pour revenir sur cette page afin de récupérer les QR Codes ou modifier le défi, veuillez
                        enregistrer l&apos;url suivante: <a
                        href={window.location.origin + "/defi/" + idDefi + "?password=" + passwordDefi} target="_blank"
                        rel="noreferrer">{window.location.origin + "/defi/" + idDefi + "?password=" + passwordDefi}</a>
                    </p><br/>
                </>)}
                    <table style={{textAlign: "center", margin: "auto", width: "90vw"}}>
                        <tbody style={{fontWeight: "bold"}}>
                        <tr style={{borderBottom: "none"}}>
                            <td style={{margin: "10px", textAlign: "right"}}>Nom du défi:</td>
                            <td style={{textAlign: "center"}}>
                                <input placeholder="Nom du défi" value={defiName} onChange={e => {
                                    setIsDefiChanged(true);
                                    setDefiName(e.target.value)
                                }}/> <br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Image:</td>
                            <td style={{textAlign: "center"}}>
                                <InputAddFile type="file" accept="image/*" onChange={e => addImage(e.target.files[0])}/>
                                <div className={"file-preview"}>
                                    {image && <Image src={process.env.REACT_APP_URL_BACK + image} alt=""/>}
                                </div>
                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Description:</td>
                            <td style={{textAlign: "center"}}>
                                <textarea placeholder="Description du défi"
                                          style={{width: "90%", margin: "auto", borderRadius: "10px"}} rows={4}
                                          value={description} onChange={e => {
                                    setIsDefiChanged(true);
                                    setDescription(e.target.value)
                                }}/>

                                <br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Fichier:</td>
                            <td style={{textAlign: "center"}}>
                                <InputAddFile type="file" onChange={e => addFile(e.target.files[0])}/>
                                <div className={"file-preview"}> {file && (
                                    <a href={process.env.REACT_APP_URL_BACK + file} target="_blank"
                                       rel="noreferrer">{file.split("/").pop().split("-").pop()}</a>
                                )
                                }</div>
                                <br/>
                            </td>
                        </tr>
                        <tr style={{borderBottom: "none"}}>
                            <td style={{margin: "10px", textAlign: "right"}}>Mot caché:</td>
                            <td style={{textAlign: "center"}}>
                                <input placeholder="Mot caché" value={motCache} onChange={e => {
                                    setIsDefiChanged(true);
                                    setMotCache(e.target.value)
                                }}/> <br/><br/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {steps.map((step, index) => (
                    <div key={index}>
                        <h3>Étape {index}:</h3>
                        <ButtonLoad onClick={() => handleRemoveStep(index)}
                                    style={{margin: "20px", backgroundColor: "red", height: "40px", width: "40px"}}>
                            <FontAwesomeIcon icon={faTrash}/> </ButtonLoad> <input placeholder="Indice"
                                                                                   value={step.indice}
                                                                                   onChange={(e) => handleStepChange(index, 'indice', e.target.value)}
                                                                                   style={{margin: "20px"}}/>
                        <InputAddFile placeholder="Image" type="file" multiple accept="image/*"
                                      onChange={(e) => handleStepChange(index, 'images', e.target.files)}/> {step.idQrCode && step.idQrCode !== "verification" && (
                        <ButtonLoad onClick={() => handleGenerateQrCode(index)}
                                    style={{height: "40px", width: "40px", margin: "15px"}}><FontAwesomeIcon
                            icon={faQrcode}/> </ButtonLoad>)}
                        <div className={"file-preview"}> {step.images && step.images.map((image) => (
                            <div key={image} style={{position: 'relative'}}>
                                <Image src={process.env.REACT_APP_URL_BACK + image}
                                       alt={process.env.REACT_APP_URL_BACK + image}/>
                                <div style={{
                                    position: 'absolute',
                                    top: '2px',
                                    right: '2px',
                                    cursor: 'pointer',
                                    backgroundColor: "red",
                                    lineHeight: "20px",
                                    height: "20px",
                                    width: "20px",
                                    borderRadius: "50%",
                                }} onClick={() => deleteImage(step, image)}>
                                    &#10005; {/* Symbole Unicode pour la croix */}
                                </div>
                            </div>

                        ))}</div>
                        <p style={{color: "red"}}>{step.message}</p><br/>
                    </div>
                ))} <br/> <ButtonLoad onClick={handleAddStep}
                                      style={{backgroundColor: "green", height: "40px", width: "40px"}}>
                <FontAwesomeIcon icon={faPlus}/></ButtonLoad>

                <br/><br/> {allQrcodeAreVerif() && (
                <ButtonLoad onClick={handleDefiPdf}>Générer la feuille de Route</ButtonLoad>
            )} <br/> {isDefiChanged && (<ButtonLoad onClick={handleDefiCreation}>{isUpdate() && (
                <>Envoyer la modification du défi</>
            )}{isCreate() && (
                <span>Créer le défi</span>
            )}</ButtonLoad>)} {validateDefiNeed && !allQrcodeAreVerif() && (
                <>
                    <br/> <ButtonLoad onClick={handleValidateDefi}>Valider le défi</ButtonLoad>
                </>
            )}
            </div>
        </>
    )
        ;
};

export default CreateDefiQrCode;
