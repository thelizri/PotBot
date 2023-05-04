import React from "react";
import {Link} from "react-router-dom";
import addPlantIcon from "../styling/images/plus-pot.png";
import elephant from "../styling/images/elefant.jpg";

export default function PlantView({user, plants, Plant}) {

  function renderPlants({plants, Plant}) {
    let meas = 'measureData';
    let array = [];
    {
      Object.keys(plants).map(name => {
        const plantData = plants[name];
        const plantVitals = plantData.plantRecommendedVitals;
      let imageURL;
      if (plantVitals) {
        imageURL = plantVitals.image || plantVitals.imageUrl || elephant;
      }
        console.log("Plant data:", plantData);
        return array.push(
        <Plant 
          className={name} 
          key={name} 
          data={plantData[meas]} 
          name={name}
          imageURL={imageURL}
          />
        );
      });
    }
    return array;
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
