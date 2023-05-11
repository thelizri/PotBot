import {connectPotBot, readUserData, removePlant, setWateredTrue, useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link, useNavigate} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg";
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
        case 'Frequent':
          return 75;
        case 'Average':
          return 50;
        case 'Minimum':
          return 25;
        case 'None':
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
                  <div className="circle"
                       style={{color: getMoistureColor(latest.soilMoisture, wateringValue)}}>{latest.soilMoisture} </div>
                  <p>Moisture</p>
                </div>
                <div className="col">
                  <div className="circle"
                       style={{color: getLightColor(latest.uvIntensity, sunlightValue)}}>{latest.uvIntensity}</div>
                  <p>Light</p>
                </div>
                <div className="col">
                  <div className="circle">{latest.temperature}</div>
                  <p>Temperature</p>
                </div>
                <div className="col">
                  <div className="circle">{latest.waterLevel}</div>
                  <p>Waterlevel</p>
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


