import {hasPlants, readUserData, useAuth, setWateredTrue} from "../firebaseModel";
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

  function Plant({name, data}) {
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

    return (
      <>
        <div className={`expandable-div ${expanded ? "expanded" : ""}`}
             onClick={handleClick}>
          <div className="card-title">
            <img src={elephant} width="100" height="100" alt={"Oh no your plantpicture is gone"}/>
            <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
          </div>
          {expanded && <div className="plant-data">
            <div className="row">
              <div className="col">
                <div className="circle">{latest.soilMoisture} </div>
                <p>Moisture</p>
              </div>
              <div className="col">
                <div className="circle">{latest.uvIntensity}</div>
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
              <div className="stats-btn"><Link to="/history" state={data}>See growth history</Link></div>
            </div>
            <div className="row">
              <div className="stats-btn"><button type="button" className="water-btn" onClick={()=> setWateredTrue(user)}>Water plant</button></div>
            </div>
          </div>}
        </div>
      </>) 

  }

  return (
        <div>
          {<PlantView user={user} plants={plants} Plant={Plant}/>}
        </div>)

  /* DummieButton to add a new plant */
  /* function buttonHandler() {
    //navigate("/addPlant")
    addNewPlant(user, "plants", "Elefant-ear" ).catch(error => {console.error(error)})
  } */
}
