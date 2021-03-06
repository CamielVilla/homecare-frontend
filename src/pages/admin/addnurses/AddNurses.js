import React, {useState} from "react";
import "./AddNurses.css"
import GetUsers from "../../../components/getfunctions/GetUsers";
import Form from "../../../components/Form/Form";
import {useForm} from "react-hook-form";
import TextInput from "../../../components/Form/TextInput";
import Button from "../../../components/Button/Button";
import Page from "../../../components/Page/Page";
import axios from "axios";


function AddNurses() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [addSucces, toggleAddSucces] = useState(false)

    async function addNurse (e) {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.post('http://localhost:8080/admin/addnurse',  {
                name: e.nurseName,
                email: e.nurseEmail,
                password: e.nursePassword,
                bigNumber: e.nurseBig,
                role: "NURSE",
                enabled: 1,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            toggleAddSucces(true)
            const nameField = document.getElementById("nurse-name")
            const emailField = document.getElementById("nurse-email")
            const passWordField = document.getElementById("nurse-password")
            const bigField = document.getElementById("nurse-big")
            nameField.value = ""
            emailField.value = ""
            passWordField.value = ""
            bigField.value = ""
        }catch (e) {
            console.error(e)
        }
    }
    return (
        <Page>
        <GetUsers
            name="Zorgverleners overzicht"
            toUser="naar zorverlener"
            userType="nurses"
            columnOne="Naam"
            columnTwo="email"
            columnThree="big nummer"
         />

            <div className="nurses-form-container">
            <Form
                handleSubmit={handleSubmit(addNurse)}
                title="voeg zorgverlener toe"
            >
                <TextInput
                    htmlFor="nurse-name"
                    type="text"
                    placeholder="Naam"
                    fieldName="nurseName"
                    register={register}
                    errors={errors}
                    minimLength={3}
                    maximLength={50}
                    isRequired={true}
                />
                <TextInput
                    htmlFor="nurse-email"
                    type="email"
                    placeholder="email adres"
                    fieldName="nurseEmail"
                    register={register}
                    errors={errors}
                    minimLength={3}
                    maximLength={50}
                    isRequired={true}
                />
                <TextInput
                    htmlFor="nurse-password"n
                    type="text"
                    placeholder="Wachtwoord"
                    fieldName="nursePassword"
                    register={register}
                    errors={errors}
                    minimLength={6}
                    maximLength={50}
                    isRequired={true}
                />
                <TextInput
                    htmlFor="nurse-big"
                    type="text"
                    placeholder="Big-nummer"
                    fieldName="nurseBig"
                    register={register}
                    errors={errors}
                    minimLength={3}
                    maximLength={50}
                    isRequired={true}
                />
                <div className="button-container-admin-nurses">
                    <Button buttonType="reset">Reset</Button>
                    <Button buttonType="submit">Voeg toe</Button>
                </div>
                {addSucces && <h3>Zorgverlener toegevoegd. Refresh de pagina om de zorgverlener in het overzicht te zien.</h3>}
            </Form>
            </div>
        </Page>
    )
}
export default AddNurses;