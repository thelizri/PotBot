import {useAuth, readUserData, hasPlants} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import AddPlantView from "../views/AddPlantView";

export default function PlantPresenter() {
    const [plants, setPlants] = useState([]);

    const {user} = useAuth();
    let hasPlantPromise = hasPlants(user);
    const [hasPlant, setPlantBool] = useState(false);
    hasPlantPromise.then((v) => {
        console.log(v + " hasPlantPromise");
        setPlantBool(v);
    }).catch(err => console.error(err));

    useEffect(() => {
        if (plants.length === 0) {
            readUserData(user, "plants").then((data => {
                setPlants(data)
            }));
        }
    }, [user])

    return <div>
        {hasPlant? <PlantView plants={plants}/> : <AddPlantView/>}
    </div>
}
