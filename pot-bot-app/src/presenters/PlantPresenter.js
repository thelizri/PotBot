import {readUserData, removePlant, setWateredTrue, useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg"
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
    const [latest, setLatest] = useState({})
    const {user} = useAuth()
    const [watering, setWatering] = useState(null);

    function handleClick(e) {
      e.preventDefault()
      setExpanded(prevState => !prevState);
    }

    useEffect(() => {
      let latestDate = Object.keys(data).map((x) =>
        parseInt(x)).reduce((a, b) => Math.max(a, b))
      setLatest(data[latestDate])
      setWatering(plants[name.toString()].settings.water)
    }, [user, data])
    let image = plants[name.toString()].plantRecommendedVitals.image.trim();
    console.log(image)
    return (
      <>
        <div id={name} className={`expandable-div ${expanded ? "expanded" : ""}`}
             onClick={handleClick}>
          <div className="card-title">
            <img src={image !== "NaN" ? image : elephant} width="100" height="100"
                 alt={"Oh no your plantpicture is gone"}/>
            <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
          </div>
          <div className="plant-data">
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
                <div className="circle">{latest.temperature}</div>
                <p>Temperature</p>
              </div>
              <div className="col">
                <div className="circle">{latest.waterLevel}</div>
                <p>Waterlevel</p>
              </div>
            </div>
            <div className="row">
              <div className="stats-btn"><Link to="/history" state={{name: name, data}}>See growth history</Link></div>
            </div>
            <div className="row">
              <div className="stats-btn">
                {!watering ? <button type="button" className="water-btn"
                                     onClick={() => setWateredTrue(user, name).then(() => setWatering(true))}>Water
                  plant
                </button> : <p>Watering plant</p>} </div>
              <div className="stats-btn">
                <button type={"button"}
                        onClick={(event) => removePlant(event.target.parentElement.parentElement.parentElement.parentElement.id)}>Delete
                  this plant
                </button>
              </div>
            </div>
          </div>
        </div>
      </>)

  }

  return <>
    {<PlantView user={user} plants={plants} Plant={Plant}/>}
  </>

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
}
