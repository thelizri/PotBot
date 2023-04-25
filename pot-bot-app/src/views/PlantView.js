import {useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";


export default function PlantView(props) {
    const {user} = useAuth();
    let plantPromise = props.plants;
    const [plants, setPlants] = useState([]);
    console.log(plants)


    useEffect(() => {
        if (plants.length == 0) {
            plantPromise.then((data => setPlants(data)));
        }
    }, [user, plants])

    function renderPlants(plant) {
        console.log(plant)
        return (
            <div>
                <h2>{`${plant.key}`}</h2>
            </div>
        )
    }

    return (
        <div>
            <h1>Plants</h1>
            <p style={{align: 'center'}}>get plants from db in list</p>
            {plants && plants.map(x => <p>{x}</p>)}

        </div>
    )


}