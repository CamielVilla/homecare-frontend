import React, {useContext, useState} from "react";
import "./ProfilePage.css"
import Form from "../../components/Form/Form";
import {useForm} from "react-hook-form";
import TextInput from "../../components/Form/TextInput";
import Button from "../../components/Button/Button";
import Page from "../../components/Page/Page";
import axios from "axios";
import  {AuthContext} from "../../Context/AuthContext";

function ProfilePage(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user  } = useContext(AuthContext);
    const [succes, toggleSucces] = useState(false);
    async function updatePassword (e) {
        const token = localStorage.getItem('token')
        try {
            const response = await axios.put(`http://localhost:8080/users/${user.id}/password`,  {
                oldPassword: e.oldPassword,
                newPassword: e.newPassword,
                repeatNewPassword: e.newPasswordConfirm,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });toggleSucces(true);
                const oldPassword = document.getElementById("old-password");
                const newPassword = document.getElementById("new-password");
                const repeatNewPassword = document.getElementById("new-password-confirm")
                oldPassword.value="";
                newPassword.value="";
                repeatNewPassword.value="";


        }catch (e) {
            console.error(e)
        }
    }

    return(
        <Page>
            <div className="profile-page">
                <div className="profile-page-container">
                <h1>Uw gegevens</h1>
                <h2>Naam: {user.name}</h2>
                <h2>Email: {user.email}</h2>
                <h2>Wachtwoord wijzigen:</h2>
                </div>
                <Form
                handleSubmit={handleSubmit(updatePassword)}
                >
                    <TextInput
                        htmlFor="old-password"
                        type="password"
                        placeholder="Oud wachtwoord"
                        fieldName="oldPassword"
                        register={register}
                        errors={errors}
                        minimLength={6}
                        maximLength={50}
                        isRequired={true}
                    />
                    <TextInput
                        htmlFor="new-password"
                        type="password"
                        placeholder="Nieuw wachtwoord"
                        fieldName="newPassword"
                        register={register}
                        errors={errors}
                        minimLength={6}
                        maximLength={50}
                        isRequired={true}
                    />
                    <TextInput
                        htmlFor="new-password-confirm"
                        type="password"
                        placeholder="Herhaal nieuw wachtwoord"
                        fieldName="newPasswordConfirm"
                        register={register}
                        errors={errors}
                        minimLength={6}
                        maximLength={50}
                        isRequired={true}
                    />
                    <div className="button-container-patient-password">
                        <Button buttonType="reset">Reset</Button>
                        <Button buttonType="submit">Wijzig</Button>
                    </div>
                    {succes && <p>Wachtwoord gewijzigd</p>}
                </Form>
            </div>
        </Page>
    )
}

export default ProfilePage;