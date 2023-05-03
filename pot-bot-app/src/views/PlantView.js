import React from "react";
import {Link} from "react-router-dom";
import addPlantIcon from "../styling/images/plus-pot.png";

export default function PlantView({user, plants, hasPlant, Plant}) {
  /*
  * TODO:remove date when database is updated and update this function*/
  function renderPlants({plants, Plant}) {
    let meas = 'measureData', date = new Date(), month = date.getMonth(), day = date.getDate();
    if (month < 10) {
      month = `0${month + 1}`
    } else {
      month = month + 1
    }
    if (day < 10) {
      day = `0${day}`
    }
    let today = (`${day}-${month}-${date.getFullYear()}`)
    let array = []
    {
      Object.keys(plants).map(name => {
        return array.push(<Plant className={name} key={name} data={plants[name][meas]} today={today} plant={name}/>)
      })
    }
    return (array)
  }

  return (
    <div>
      <h2>Your plants</h2>
      {plants && user && hasPlant && (<div className="plant-data">
        {renderPlants({plants, Plant})}
      </div>)}

      {plants && (
        <div className={"addPlant"}>
          <Link to="/addNewPlant">
            {<img src={addPlantIcon}/>}
          </Link>
        </div>
      )}
    </div>
  )
}
