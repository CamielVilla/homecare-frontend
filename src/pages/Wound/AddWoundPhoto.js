import React, {useState} from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import "./AddWound.css"

function AddWoundPhoto({woundId, handleClick}) {

    const [previewUrl, setPreviewUrl] = useState("");
    const [file, setFile] = useState([]);
    const [disabled, toggleDisabled] = useState(true);
    const [addSucces, toggleAddSucces] = useState(false);



    function handleImageChange(e) {
        e.preventDefault();
        const uploadedFile = e.target.files[0];
        toggleDisabled(false)
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }



    async function sendImage(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        try {
            const result = await axios.post(`http://localhost:8080/wounds/${woundId}/photo`,
               formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
            toggleAddSucces(true);
            setPreviewUrl("")
            toggleDisabled(true)
            const imageInput = document.getElementById("wound-image");
            imageInput.value="";
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <form title="Voeg foto toe" className="wound-image-container" id="add-photo" onSubmit={sendImage} >
            <label htmlFor="wound-image" className="wound-image">
                <input type="file"
                       id="wound-image"
                       name="image-field"
                       onChange={handleImageChange}
                />
            </label>
            {previewUrl &&
                <div className="image-preview-container">
                <label>
                    <img
                        src={previewUrl}
                        alt="voorbeeld van de afbeelding" className="image-preview" />
                </label>
                </div>
            }
            <Button disabled={disabled} buttonType="submit" handleClick={handleClick}>Voeg foto toe</Button>
            {addSucces && <h3>Foto toegevoegd</h3>}
        </form>

    )
}

export default AddWoundPhoto;

