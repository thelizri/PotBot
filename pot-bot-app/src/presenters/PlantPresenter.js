import {connectPotBot, readUserData, removePlant, setWateredTrue, useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link, useNavigate} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faSun, faThermometerHalf, faFlask } from '@fortawesome/free-solid-svg-icons';
import trash from '../styling/images/trash.svg'
import graph from '../styling/images/graph.svg'
import waterdrop from '../styling/images/waterdrop.svg'

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


  function Plant({name, data, watering, sunlight, productID}) {
    const [expanded, setExpanded] = useState(false);
    const [latest, setLatest] = useState({})
    const [connected, setConnected] = useState(false)
    const {user} = useAuth()
    let n = useNavigate()


    function handleClick(e) {
      e.preventDefault()
      setExpanded(prevState => !prevState);
    }

    useEffect(() => {
      let latestDate = Object.keys(data).map((x) =>
        parseInt(x)).reduce((a, b) => Math.max(a, b))
      setLatest(data[latestDate])
      if (productID !== 'RaspberryPi') {
        setConnected(true)
      }
    }, [user, data, productID])

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
        case 'frequent' || 'Frequent':
          return { min: 60, max: 90 };
        case 'average' || 'Average':
          return { min: 30, max: 60 };
        case 'minimum' || 'Minimum':
          return { min: 15, max: 30 };
        case 'none' || 'None':
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
          case 'full_shade' || 'Full_shade':
            total += 0.1;
            count += 1;
            break;
          case 'part_shade' || 'Part_shade':
            total += 0.35;
            count += 1;
            break;
          case 'sun-part_shade' || 'Sun-part_shade':
            total += 0.65;
            count += 1;
            break;
          case 'full_sun'  || 'Full_sun':
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

    function connectPotBotHandler(productID, name) {
      console.log(productID.target, name);

      const data = {uid: user.uid, plant: name}

      //n('/home');
      /*const data2 = {plantRecommendedVitals: {
          image: "NaN",
          sunlight: ["Full sun", "part shade"],
          temperature:"15",
          watering:"Average"
        }}*/
      connectPotBot(productID.target, data).then((v) => console.log("Successful adding")).catch(error => {
        console.error(error)
      })
    }

    let wateringValue = wateringToValue(watering);
    // console.log(wateringValue)
    let sunlightValue = sunlightToValue(sunlight);
    let image = plants[name].plantRecommendedVitals.image;
    if (!image || image === "NaN") {
      image = elephant
    }
    return (
      <>
        {connected ?
          <div id={name} className={`expandable-div ${expanded && connected ? "expanded" : ""}`}
               onClick={handleClick}>
            <div className="card-title">
              <img src={image} width="100" height="100"
                   alt={"Oh no your plant picture is gone"}/>
              <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
            </div>
            <div className="plant-data">
              <div className="row">
                <div className="col">
                  <div className="circle" style={{color: getMoistureColor(latest.soilMoisture, wateringValue)}}>{latest.soilMoisture}</div>
                  <p><FontAwesomeIcon icon={faTint} title={watering}/> Moisture</p>
                </div>
                <div className="col">
                  <div className="circle" style={{color: getLightColor(latest.uvIntensity, sunlightValue)}}>{latest.uvIntensity}</div>
                  <p><FontAwesomeIcon icon={faSun} title={sunlight.join(', ')}/> Light</p>
                </div>
                <div className="col">
                  <div className="circle" style={{color: getTemperatureColor(latest.temperature)}}>{latest.temperature}</div>
                  <p><FontAwesomeIcon icon={faThermometerHalf}/> Temperature</p>
                </div>
                <div className="col">
                  <div className="circle" style={{color: getWaterlevelColor(latest.waterLevel)}}>{latest.waterLevel}</div>
                  <p><FontAwesomeIcon icon={faFlask}/> Waterlevel</p>
                </div>
              </div>
              <div className="settings-btn"><Link to={`/settings/${name}`} state={plants}>Watering settings</Link></div>
              <button id="trash" className={"icon--small"} type={"button"} onClick={(event) => removePlant(name)}>{<img
                src={trash}></img>}</button>
              <Link to={`/history/${name}`} state={data} id="graph" className={"icon--small"}>{<img src={graph}></img>}</Link>
              <button id="waterdrop" className={"icon--small"} type={"button"}
                      onClick={(event) => setWateredTrue(name)}>{<img src={waterdrop}></img>}</button>
            </div>
          </div> :
          <div id={name} className='expandable-div'>
            <div className="card-title">
              <img src={image} width="100" height="100"
                   alt={"Oh no your plant picture is gone"}/>
              <form className='expandable-div'>Enter your code and press connect<input type='text' name='productID'
                                                                                       required/>
              </form>
              <button type='button' className='expandable-div'>Connect {name}
              </button>
            </div>
          </div>}
      </>)
  }

  return <PlantView user={user} plants={plants} Plant={Plant}/>
}

/* DummieButton to add a new plant */


