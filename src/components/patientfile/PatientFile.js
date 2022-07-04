import React, {useContext, useEffect, useState} from "react";
import "./PatientFile.css";
import Page from "../Page/Page";
import Table from "../table/Table";
import Button from "../Button/Button";
import axios from "axios";
import {AuthContext} from "../../Context/AuthContext";
import {useHistory} from "react-router-dom";







function PatientFile({id}){

    const [woundExaminations, setWoundExaminations] = useState([])
    const [wounds, setWounds] = useState([])
    const [wound, setWound] = useState("")
    const [patient, setPatient] = useState("")
    const { user: { name, role }  } = useContext(AuthContext)
    const history = useHistory();
    const [assessment, setAssessment] = useState();
    const token = localStorage.getItem('token')
    const [previewUrl, setPreviewUrl] = useState("");
    const [file, setFile] = useState([]);
    const [disabled, toggleDisabled] = useState(true);
    const [addSucces, toggleAddSucces] = useState(false);


    function handleImageChange(e) {
        e.preventDefault();
        const uploadedFile = e.target.files[0];
        toggleAddSucces(false)
        toggleDisabled(false)
        setFile(uploadedFile);
        setPreviewUrl(URL.createObjectURL(uploadedFile));
    }


        async function fetchExamsFromWound(woundId){
            try {
                const result = await  axios.get(`http://localhost:8080/wounds/${woundId}/exams`)
                setWoundExaminations(result.data)
            }catch (e) {
                console.error(e)
            }
        }



    async function sendImage(e) {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", file);
        try {
            const result = await axios.post(`http://localhost:8080/wounds/${wound.id}/photo`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    }
                })
            toggleAddSucces(true);
            setPreviewUrl("")
            toggleDisabled(true)
            const imageInput = document.getElementById("wound-image");
            imageInput.value="";
            const newExam = result.data
            setWoundExaminations(oldExams => [...woundExaminations, newExam])
        } catch (e) {
            console.error(e)
        }
    }

    async function addAssessment(examId){
        try{
            const result = await axios.put(`http://localhost:8080/wounds/assessment/${wound.id}/${examId}`, {
                nurseAssessment: assessment,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            })
            const assessmentText = document.getElementById(examId)
            assessmentText.value="";
            setWoundExaminations(result.data)
        }catch (e){
            console.error(e)
        }
    }



    useEffect( () => {
        async function fetchPatientWounds(){
            try {
                const result = await axios.get(`http://localhost:8080/patients/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                setPatient(result.data.name)
                if (wounds.length >= 0){
                    setWounds(result.data.wounds);
                }

            }catch (e) {
                console.error(e)
            }
        }fetchPatientWounds();
    } ,[] )




    return(
        <>
            {role === "PATIENT" ?
                <h1>Dossier van {name}</h1>
                : <h1>Dossier van {patient}</h1>
            }
            {!wound.woundName && <h2>selecteer een wond</h2>}
            <div className="patient-nav">
                <div className="patient-nav-container">
                    {wounds && wounds.map((wound) => {
                        return <div key={wound.id}><Button  buttonType="button" handleClick={() => {
                            setWound(wound); fetchExamsFromWound(wound.id)}}
                        >
                            {wound.woundName + " " + wound.woundLocation }
                        </Button>
                        </div>
                    })}
                    {role !== "PATIENT" &&
                        <button className="add-wound-button" onClick={() => history.push(`/nieuwe-wond/${id}`)}>Voeg wond toe</button>
                    }
                </div>
            </div>
<Page>

            <div className="table-container">
                {wound.woundName &&
                <div className="add-photo-container">
                <h1> {wound.woundName + " " + wound.woundLocation }</h1>
                    {role === "PATIENT" &&
                        <form title="Voeg foto toe" className="wound-image-container" id="add-photo"
                              onSubmit={sendImage}>
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
                                            alt="voorbeeld van de afbeelding" className="image-preview"/>
                                    </label>
                                </div>
                            }
                            <Button disabled={disabled} buttonType="submit">Voeg foto toe</Button>
                            {addSucces && <h3>Foto toegevoegd</h3>}
                        </form>
                    }

                    <Table className="photo-table">
                    <tr>
                        <th>Datum</th>
                        <th>Foto</th>
                        <th>Beoordeling</th>
                    </tr>
                {
                    woundExaminations.map((woundExam, index) => {
                       return <tr key={woundExam.file.url}>
                                <td>{woundExam.photoDate}</td>
                                <td><img src={woundExam.file.url} alt={woundExam.id} /></td>
                           {role === 'PATIENT' || role === "ADMIN"
                               &&
                               <td>{woundExam.nurseAssessment}</td>
                           }
                           {!woundExam.nurseAssessment && role !== 'PATIENT' ?
                               <td>
                                   <form>
                                       <label htmlFor={woundExam.id}>
                                       <textarea
                                           id={woundExam.id}
                                           name="nurse-assessment-field"
                                           cols={40}
                                           rows={10}
                                           onChange={(e) => setAssessment(e.target.value)}
                                       >
                                       </textarea>
                                       </label>
                                       <Button buttonType="submit" handleClick={(e) => {e.preventDefault(); addAssessment(woundExam.id)}}>Voeg beoordeling toe</Button>
                                   </form>
                               </td>
                               :<td>{woundExam.nurseAssessment}</td>
                           }
                       </tr>
                    })}
            </Table>
                </div>
                }
                </div>
    {wound.woundName &&
    <div className="treatment-plan-container">
        <h2>Behandelplan</h2>
        <p>{wound.treatmentPlan}</p>
    </div>
    }
</Page>
        </>
    )
}

export default PatientFile;