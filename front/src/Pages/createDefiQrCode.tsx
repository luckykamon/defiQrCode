import React, {FC, useState} from 'react';
import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import Image from "../Components/Image";

const CreateDefiQrCode: FC = () => {
    const initialStep = {indice: '', images: null, message: ''};

    const [steps, setSteps] = useState([initialStep]);
    const [defiName, setDefiName] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<string | null>(null);

    const uploadImage = (file: File) => {
        return new Promise((resolve, reject) => {
            const formdata = new FormData();
            formdata.append("image", file, "IMG_4874.jpeg");

            fetch(process.env.REACT_APP_URL_BACK + "/api/image", {
                method: 'POST',
                body: formdata,
                redirect: 'follow'
            })
                .then(response => response.text())
                .then(result => {
                    resolve("/" + result);
                })
                .catch(error => {
                    console.log('error', error)
                    reject(error);
                });
        })

    }

    const handleAddStep = () => {
        setSteps([...steps, initialStep]);
    };

    const handleRemoveStep = (index: number) => {
        if (steps.length === 1) return alert('Vous devez avoir au moins une étape.');
        if (confirm('Êtes-vous sûr de vouloir supprimer cette étape ?') === false) return;
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };

    const checkStep = (step: { indice: string, images: string | FileList }) => {
        const messages = [];
        if (step.indice === '') {
            messages.push("Veuillez entrer un indice.");
        }
        if (step.images instanceof FileList) {
            if (step.images.length === 0) {
                messages.push("Veuillez sélectionner au moins une image.");
            }
            if (step.images.length > 3) {
                messages.push("Veuillez sélectionner au maximum 3 images.");
            }
        }
        return messages;
    }

    const handleStepChange = async (index: number, field: string, value: string | FileList) => {
            const updatedSteps = [...steps];
            const newValue: string[] = [];
            if (field === 'images') {
                if (value instanceof FileList) {
                    for (const image of value) {
                        await uploadImage(image)
                            .then((result) => {
                                if (typeof result === "string") {
                                    newValue.push(result);
                                } else {
                                    throw new Error("La fonction d'upload d'image n'as pas renvoyé un string");
                                }

                            })
                            .catch(() => {
                                return;
                            })
                    }
                } else { // Ce cas ne doit pas arriver
                    return;
                }
            }
            if (newValue.length > 0) {
                updatedSteps[index][field] = newValue;
            } else {
                updatedSteps[index][field] = value;
            }
            const messages: string[] = checkStep(updatedSteps[index]);
            if (messages.length > 0) {
                updatedSteps[index].message = messages.join(' ');
            } else {
                updatedSteps[index].message = '';
            }
            setSteps(updatedSteps);
        }
    ;

    const handleDefiCreation = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const qrcodes = [];
        for (let stepId = 0; stepId < steps.length; stepId++) {
            const listImage = [];
            for (let imageId = 0; imageId < steps[stepId].images.length; imageId++) {
                listImage.push({
                    "name": steps[stepId].images[imageId].split('/')[-1],
                    "path": steps[stepId].images[imageId],
                });
            }
            qrcodes.push({
                "number": stepId,
                "indice": steps[stepId].indice,
                "listImage": listImage
            })
        }

        const raw = JSON.stringify({
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
            "qrcode": qrcodes
        });

        fetch("http://localhost:4011/api/defi", {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    };

    const addImage = (file) => {
        uploadImage(file)
            .then((result: string) => {
                setImage(result);
            })
    }

    const addFile = (file) => {
        uploadImage(file)
            .then((result: string) => {
                setFile(result);
            })
    }

    return (
        <>
            <NavBar page=""/>
            <div style={{textAlign: "center", marginTop: "40px"}}>
                <div style={{display: "block"}}>
                    <h1>Créer un défi</h1><br/>
                    <table style={{textAlign: "center", margin: "auto", width: "90vw"}}>
                        <tbody style={{fontWeight: "bold"}}>
                        <tr style={{borderBottom: "none"}}>
                            <td style={{margin: "10px", textAlign: "right"}}>Nom du défi:</td>
                            <td style={{textAlign: "center"}}>
                                <input placeholder="Nom du défi" value={defiName}
                                       onChange={e => setDefiName(e.target.value)}/> <br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Image:</td>
                            <td style={{textAlign: "center"}}>
                                <input type="file" accept="image/*" onChange={e => addImage(e.target.files[0])}/>
                                <br/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Description:</td>
                            <td style={{textAlign: "center"}}>
                                <textarea placeholder="Description du défi"
                                          style={{width: "90%", margin: "auto", borderRadius: "10px"}} rows={4}
                                          value={description} onChange={e => setDescription(e.target.value)}/> <br/>
                            </td>
                        </tr>
                        <tr>
                            <td style={{margin: "10px", textAlign: "right"}}>Fichier:</td>
                            <td style={{textAlign: "center"}}>
                                <input type="file" onChange={e => addFile(e.target.files[0])}/> <br/><br/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {steps.map((step, index) => (
                    <div key={index}>
                        <h3>Étape {index}:</h3>
                        <input placeholder="Indice" value={step.indice}
                               onChange={(e) => handleStepChange(index, 'indice', e.target.value)}
                               style={{margin: "20px"}}/> <input placeholder="Image" type="file" multiple
                                                                 accept="image/*"
                                                                 onChange={(e) => handleStepChange(index, 'images', e.target.files)}/> {step.images && step.images.map((image) => (
                        <Image key={image} src={process.env.REACT_APP_URL_BACK + image} alt={process.env.REACT_APP_URL_BACK + image}/>
                    ))}<p style={{color: "red"}}>{step.message}</p>
                        <button onClick={() => handleRemoveStep(index)} style={{margin: "20px"}}>Supprimer cette étape
                        </button>
                    </div>
                ))} <br/>
                <button onClick={handleAddStep}>Ajouter une étape</button>

                <br/><br/>
                <button onClick={handleDefiCreation}>Créer le défi</button>
            </div>
            <Footer/>
        </>
    );
}

export default CreateDefiQrCode;
