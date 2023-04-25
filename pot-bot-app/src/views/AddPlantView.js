
import React from "react";
import {useAuth} from "../firebaseModel";

export default function AddPlantView(props) {
    const {user} = useAuth();
    const plant = '';

    //add function for scrolling plants or carousel images of plants
    //add function for text search for a plant
    return(
    <div className="addPlant">
        <h1>Choose your plant to add</h1>
        {/*add functions here*/}


    </div>

    )


}