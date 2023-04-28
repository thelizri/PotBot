import {useAuth, readUserData, hasPlants, addNewPlant, updatePlantData, readUserPlantData} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import AddPlantView from "../views/AddPlantView";
import {Plants} from "./Plants";

export default function PlantPresenter() {
    const [plants, setPlants] = useState(null);
    const {user} = useAuth();
    let hasPlantPromise = hasPlants(user);
    const [hasPlant, setPlantBool] = useState(false);
    hasPlantPromise.then((v) => {
        //console.log(v + " hasPlantPromise");
        setPlantBool(v);
    }).catch(err => console.error(err));

    useEffect(() => {
        if (plants == null) {
            readUserData(user, "plants").then((data => {
                setPlants(data)
            }));
        }
    }, [user])
  /**
   * DummieButton to add a new plant*/
  function buttonHandler() {
      addNewPlant(user, "plants", "Parasollpilea" ).catch(error => {console.error(error)})
    }
  function renderPlants(){
    let meas = 'measureData', date = new Date(), month = "0", m = date.getMonth();
    if (m < 10) {
      month += `${m+1}`
    }else { month = m + 1}
    let today = (`${date.getDate()}-${month}-${date.getFullYear()}`)
    let array = []
    {Object.keys(plants).map(name => {
      return array.push(<Plants className={name}  data={plants[name][meas]} today={today} plants={name} />)
    })}
    return (<div>{array}</div>)
  }
  return <div>
        {hasPlant && plants? <PlantView plants={plants} Plants={renderPlants}/> : <AddPlantView buttonHandler={buttonHandler}/>}
    </div>
}
