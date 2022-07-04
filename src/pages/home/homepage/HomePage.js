import React from "react";
import './HomePage.css';
import Header from "../../../components/Header/Header";
import Tile from "../../../components/Tile/Tile";
import person from "../../../assets/symbols/person.png";
import nurse from "../../../assets/symbols/nurse.png";
import {useHistory} from "react-router-dom";
import Button from "../../../components/Button/Button";


function Homepage(){
    const history = useHistory();

    function handleClickLogIn() {
        history.push("/login");
    }

    return (
        <>
            <header className="homepage">
            <div className="homepage-container">
                <Header />
                <div className="tile-container">
                    <Tile
                        image={person}
                        title="inloggen"
                        text="log in bij uw Homecare account"
                    ><Button  buttonType="button" handleClick={handleClickLogIn}>
                        Naar inloggen
                    </Button> </Tile>
                </div>
            </div>
        </header>
            <img src={nurse} alt="nurse-background"  className="nurse-image"/>
        </>
    )
}

export default Homepage;
