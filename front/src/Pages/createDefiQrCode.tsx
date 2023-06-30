import React, {FC, useState} from 'react';
import NavBar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

const CreateDefiQrCode: FC = () => {
    const initialStep = {indice: '', images: null, message: ''};

    const [steps, setSteps] = useState([initialStep]);
    const [defiName, setDefiName] = useState('');
    const [image, setImage] = useState<FileList | null>(null);
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<FileList | null>(null);

    const handleAddStep = () => {
        setSteps([...steps, initialStep]);
    };

    const handleRemoveStep = (index: number) => {
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

    const handleStepChange = (index: number, field: string, value: string | FileList) => {
        const updatedSteps = [...steps];
        updatedSteps[index][field] = value;
        const messages = checkStep(updatedSteps[index]);
        if (messages.length > 0) {
            updatedSteps[index].message = messages.join(' ');
        } else {
            updatedSteps[index].message = '';
            updatedSteps[index][field] = value;
        }
        setSteps(updatedSteps);
    };

    const handleDefiCreation = () => {
        // console.log(defiName, image, description, file, steps);
        const formdata = new FormData();
        formdata.append("name", defiName);
        formdata.append("image", image ? image[0] : "sss ");
        formdata.append("description", description);
        formdata.append("fichier", file ? file[0] : "nuxsll");
        for (let stepId = 0; stepId < steps.length; stepId++) {
            formdata.append("indice-" + stepId, steps[stepId].indice);
            for (let imageId = 0; imageId < steps[stepId].images.length; imageId++) {
                formdata.append("image-" + stepId + "-" + imageId, steps[stepId].images[imageId]);
            }
        }

        fetch("http://localhost:4011/api/defi", {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        })
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

    };

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
                                <input type="file" accept="image/*" onChange={e => setImage(e.target.files)}/>
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
                                <input type="file" onChange={e => setFile(e.target.files)}/> <br/><br/>
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
                                                                 onChange={(e) => handleStepChange(index, 'images', e.target.files)}/>
                        <p style={{color: "red"}}>{step.message}</p>
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
