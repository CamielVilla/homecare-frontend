import React, {useEffect, useState} from "react";
import "./WoundsToAssess.css";
import Page from "../../../components/Page/Page";
import {NavLink} from "react-router-dom";
import axios from "axios";
import Table from "../../../components/table/Table";


function WoundsToAsses(){
    const [wounds, setWounds] = useState([]);

    useEffect( () => {
        const token = localStorage.getItem('token')
        async function fetchPatients(){
            try {
                const result = await axios.get("http://localhost:8080/wounds/toassess", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                })
                setWounds(result.data);
            }catch (e) {
                console.error(e)
            }
        }fetchPatients();
    } , [])


    return(
        <Page>
            {wounds.length > 0
                ? <Table className="wounds-to-assess">
                    <tr>
                        <th>Naam</th>
                        <th>Geboorte datum</th>
                        <th>Wond</th>
                        <th></th>
                    </tr>
                     {wounds.map((wound) => {
                     return <tr key={wound.id}>
                                <td>{wound.patient.name}</td>
                         <td>{wound.patient.dateOfBirth}</td>
                         <td>{wound.woundName}</td>
                         <td><NavLink to={`/${wound.patient.id}`}>Naar patiënt</NavLink> </td>
                     </tr>
                     })}
                </Table>
            : <h2>Geen foto's om te beoordelen</h2>}
        </Page>
    )
}
export default WoundsToAsses;