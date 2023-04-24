import {Link } from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React, {useState} from "react";
import {addNewPlant, readUserData, uploadPlantData} from "../databaseFunctions";
import {get, getDatabase, ref} from "firebase/database";


export default function PlantView(props) {

    const {user} = useAuth();
    let plantPromise = props.plants;

    const [plants, setPlants] = useState([]);


    console.log(plants)
    function renderPlants(plant){
        //let {p: {}}
        console.log(plant)
        return (
            <div>
                <h2>{`${plant.key}`}</h2>

            </div>
        )
            }
    return(
        <div>
            <h1>Plants</h1>
            <p style={{align:'center'}}>get plants from db in list</p>

        </div>
    )


}