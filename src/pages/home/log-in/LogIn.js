import React, {useContext} from "react";
import './Log-in.css';
import Button from "../../../components/Button/Button";
import { useForm} from "react-hook-form";
import Form from "../../../components/Form/Form";
import TextInput from "../../../components/Form/TextInput";
import {AuthContext} from "../../../Context/AuthContext";
import Page from "../../../components/Page/Page";
import axios from "axios";


function LogIn () {

    const {register, handleSubmit, formState: {errors}} = useForm();
    const {logIn} = useContext(AuthContext)


    async function checkAuth(e) {
        try {
            const response = await axios.post(`http://localhost:8080/login`, {
                "email": e.loginEmail,
                "password": e.loginPassword
            });
            logIn(response.data)
        } catch (e) {
            console.error(e)
        }
    }


    return (
        <Page>
                <div className="login-form-container">
            <Form
                handleSubmit={handleSubmit(checkAuth)}
                title="Log in met uw Homecare gegevens"
            >
                <TextInput
                    htmlFor="login-email"
                    type="email"
                    placeholder="Email adres"z
                    fieldName="loginEmail"
                    register={register}
                    errors={errors}
                    minimLength={3}
                    maximLength={100}
                    isRequired={true}
                />
                <TextInput
                htmlFor="login-password"
                type="password"
                placeholder="Wachtwoord"
                fieldName="loginPassword"
                register={register}
                errors={errors}
                minimLength={3}
                maximLength={100}
                isRequired={true}
                />
                <div className="button-container-login">
                    <Button buttonType="submit">Log in</Button>
                </div>
            </Form>
                </div>
        </Page>
    )
}

export default LogIn;

