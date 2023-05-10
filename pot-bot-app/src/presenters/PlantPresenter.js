import {readUserData, useAuth, setWateredTrue, removePlant} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faSun, faThermometerHalf, faFlask } from '@fortawesome/free-solid-svg-icons';


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
    const [latest, setLatest] = useState({})
    const {user} = useAuth()

    function handleClick(e) {
      e.preventDefault()
      setExpanded(prevState => !prevState);
    }

    useEffect(() => {
      let latestDate = Object.keys(data).map((x) =>
        parseInt(x)).reduce((a, b) => Math.max(a, b))
      setLatest(data[latestDate])
    }, [user, data])

    function getMoistureColor(actual, wateringPreset) {
      const lowerLimit = wateringPreset.min;
      const upperLimit = wateringPreset.max;
      
      return (actual >= lowerLimit && actual <= upperLimit) ? 'green' : 'red';
    }
    
    function getLightColor(actual, sunlightPreset) {
      const lowerLimit = sunlightPreset.min;
      const upperLimit = sunlightPreset.max;
      
      return (actual >= lowerLimit && actual <= upperLimit) ? 'green' : 'red';
    }

    function getTemperatureColor(temperature) {
      return (temperature >= 10 && temperature <= 30) ? 'green' : 'red';
    }

    function getWaterlevelColor(waterLevel) {
      return (waterLevel >= 1 && waterLevel <= 0) ? 'red' : 'green';
    }

    function wateringToValue(watering) {
      switch (watering) {
        case 'frequent':
          return { min: 60, max: 90 };
        case 'average':
          return { min: 30, max: 60 };
        case 'minimum':
          return { min: 15, max: 30 };
        case 'none':
          return { min: 0, max: 15 };
        default:
          return { min: 0, max: 0 };
      }
    }
    
    function sunlightToValue(sunlight) {
      if (!Array.isArray(sunlight)) {
        return { min: 0, max: 0 };
      }
      
      let total = 0;
      let count = 0;
      
      sunlight.forEach((element) => {
        switch (element) {
          case 'full_shade':
            total += 0.1;
            count += 1;
            break;
          case 'part_shade':
            total += 0.35;
            count += 1;
            break;
          case 'sun-part_shade':
            total += 0.65;
            count += 1;
            break;
          case 'full_sun':
            total += 0.9;
            count += 1;
            break;
          default:
            break;
        }
      })
      
      const avg = total / count;
      
      let min = 0, max = 0;
      
      if (avg >= 0 && avg < 0.2) {
        min = 0; max = 0.2;
      } else if (avg >= 0.2 && avg < 0.5) {
        min = 0.2; max = 0.5;
      } else if (avg >= 0.5 && avg < 0.8) {
        min = 0.5; max = 0.8;
      } else if (avg >= 0.8 && avg <= 1.0) {
        min = 0.8; max = 1.0;
      }
      
      return { min, max };
    }

    let wateringValue = wateringToValue(watering);
    let sunlightValue = sunlightToValue(sunlight);

    return (
      <>
        <div id={name} className={`expandable-div ${expanded ? "expanded" : ""}`}
             onClick={handleClick}>
          <div className="card-title">
          <img src={(imageURL && imageURL.trim() !== "" && imageURL !== "NaN") ? imageURL : elephant} width="100" height="100" alt={"Oh no your plant picture is gone"}/>
            <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
          </div>
          <div className="plant-data">
            <div className="row">
              <div className="col">
              <div className="circle" style={{color: getMoistureColor(latest.soilMoisture, wateringValue)}}>{latest.soilMoisture} </div>
                <p><FontAwesomeIcon icon={faTint} title={watering} /> Moisture</p>
              </div>
              <div className="col">
              <div className="circle" style={{color: getLightColor(latest.uvIntensity, sunlightValue)}}>{latest.uvIntensity}</div>
              
                <p><FontAwesomeIcon icon={faSun} title={sunlight.join(', ')} /> Light</p>
              </div>
              <div className="col">
                <div className="circle" style={{ color: getTemperatureColor(latest.temperature) }}>{latest.temperature}</div>
                <p><FontAwesomeIcon icon={faThermometerHalf} /> Temperature</p>
              </div>
              <div className="col">
                <div className="circle" style={{color: getWaterlevelColor(latest.waterLevel) }}>{latest.waterLevel}</div>
                <p><FontAwesomeIcon icon={faFlask} /> Waterlevel</p>
              </div>
            </div>
            <div className="row">
              <div className="stats-btn"><Link to="/history" state={data}>See growth history</Link></div>
            </div>
            <div className="row">
              <div className="stats-btn"><button type="button" className="water-btn" onClick={()=> setWateredTrue(user)}>Water plant</button><button type={"button"} onClick={(event) => removePlant(event.target.parentElement.parentElement.parentElement.parentElement.id)}>Delete this plant</button></div>
            </div>
          </div>
        </div>
      </>) 

  }

  return <PlantView user={user} plants={plants} Plant={Plant}/>}

  /* DummieButton to add a new plant */
  /* function buttonHandler() {
    //navigate("/addPlant")
    const data2 = {measureData: 'To be added'}
    const data = {plantRecommendedVitals: {
    image: "NaN",
        sunlight: ["Full sun", "part shade"],
        temperature:"15",
        watering:"Average"
      }}
    updatePlantData(user, "plants/Parasollpilea", data2 ).catch(error => {console.error(error)})
  }*/

