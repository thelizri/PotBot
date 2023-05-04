import {readUserData, useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg";
/*TODO: Check why sometimes getting an uncaught error */
export default function PlantPresenter() {
  const [plants, setPlants] = useState(null);
  const {user} = useAuth();

  useEffect(() => {

    if (plants === null) {
      fetchData().catch(err => console.error(err.message));
    }

    async function fetchData() {
      await readUserData(user, "plants").then((data => {
        setPlants(data)
      })).catch(err => console.error(err.message));
    }
  }, [user])

  function Plant({name, data, imageURL, watering, sunlight}) {
    const [expanded, setExpanded] = useState(false);
    const [latest, setLatest] = useState(null)
    const {user} = useAuth()

    function handleClick() {
      setExpanded(!expanded);
    }

    useEffect(() => {
      let latestDate = Object.keys(data).map((x) =>
        parseInt(x)).reduce((a, b) => Math.max(a, b))
      setLatest(data[latestDate])
    }, [user, data])
    console.log(latest)

    function getMoistureColor(actual, optimal) {
      const lowerLimit = optimal * 0.8;
      const upperLimit = optimal * 1.2;
    
      return (actual >= lowerLimit && actual <= upperLimit) ? 'green' : 'red';
    }
    
    function getLightColor(actual, optimal) {
      const lowerLimit = optimal * 0.8;
      const upperLimit = optimal * 1.2;
    
      return (actual >= lowerLimit && actual <= upperLimit) ? 'green' : 'red';
    }

    function wateringToValue(watering) {
      switch (watering) {
        case 'frequent':
          return 75;
        case 'average':
          return 50;
        case 'minimum':
          return 25;
        case 'none':
          return 0;
        default:
          return 0;
      }
    }
    
    function sunlightToValue(sunlight) {
      if (!Array.isArray(sunlight)) {
        return 0;
      }
      let total = 0;
      sunlight.forEach((element) => {
        switch (element) {
          case 'full_shade':
            total += 2;
            break;
          case 'part_shade':
            total += 5;
            break;
          case 'sun-part_shade':
            total += 7;
            break;
          case 'full_sun':
            total += 10;
            break;
          default:
            break;
        }
      })
      return total / sunlight.length;
    }

    let wateringValue = wateringToValue(watering);
    let sunlightValue = sunlightToValue(sunlight);

    return (
      <>
        <div className={`expandable-div ${expanded ? "expanded" : ""}`}
             onClick={handleClick}>
          <div className="card-title">
          <img src={(imageURL && imageURL.trim() !== "" && imageURL !== "NaN") ? imageURL : elephant} width="100" height="100" alt={"Oh no your plant picture is gone"}/>
            <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
          </div>
          {expanded && <div className="plant-data">
            <div className="row">
              <div className="col">
              <div className="circle" style={{color: getMoistureColor(latest.soilMoisture, wateringValue)}}>{latest.soilMoisture} </div>
                <p>Moisture</p>
              </div>
              <div className="col">
              <div className="circle" style={{color: getLightColor(latest.uvIntensity, sunlightValue)}}>{latest.uvIntensity}</div>
                <p>Light</p>
              </div>
              <div className="col">
                <div className="circle">{latest.temperatur}</div>
                <p>Temperature</p>
              </div>
              <div className="col">
                <div className="circle">{latest.waterLevel}</div>
                <p>Waterlevel</p>
              </div>
            </div>
            <div className="row">
              <div className="stats-btn"><Link to="/stats">See growth history</Link></div>
            </div>
          </div>}
        </div>
      </>)

  }

  return <div>
    {<PlantView user={user} plants={plants} Plant={Plant}/>}
  </div>
}
  /**
   * DummieButton to add a new plant*/
  /*function buttonHandler() {
    //navigate("/addPlant")
    addNewPlant(user, "plants", "Elefant-ear" ).catch(error => {console.error(error)})
  }*/

