import React from "react";
import {Link} from "react-router-dom";
import addPlantIcon from "../styling/images/plus-pot.png";

export default function PlantView({user, plants, Plant}) {

  function renderPlants({plants, Plant}) {
    let meas = 'measureData'
    let array = []
    {
      Object.keys(plants).map(name => {
        return array.push(<Plant className={name} key={name} data={plants[name][meas]} name={name}/>)
      })
    }
    return array
  }

  return (
    <div>
      <h2>Your plants</h2>
      {plants && user && (<div className="plant-data">
        {renderPlants({plants, Plant})}
      </div>)}

      {(
        <div className={"addPlant"}>
          <Link to="/addNewPlant">
            {<img src={addPlantIcon}/>}
          </Link>
        </div>
      )}
    </div>
  )
}
