import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import elephant from "../styling/images/elefant.jpg";
import {useAuth} from "../firebaseModel";

export function Plant({plant, data, today}) {
  const [expanded, setExpanded] = useState(false);
  const [latest, setLatest] = useState(null)
  const [timeIndex, setTimeIndex] = useState("")
  const {user} = useAuth()

  function handleClick() {
    setExpanded(!expanded);
  }

  useEffect(() => {
    let latestDate = today
    //const d = new Date()
    let index = timeIndex
    if (timeIndex === "" && data !== null) {
      //let time = (`${d.getHours()}:${d.getMinutes()}`)
      Object.keys(data).forEach(key => {
        if (today !== key) {
          return (latestDate = key)
        }
      })
      index = Object.entries(data[latestDate]).sort().reverse().at(0).at(0)
    }
    setLatest(data[latestDate][index])
    setTimeIndex(index)
  }, [user, data])
  console.log(latest)
  return (
    <>
      <div className={`expandable-div ${expanded ? "expanded" : ""}`}
           onClick={handleClick}>
        <div className="card-title">
          <img src={elephant} width="100" height="100"/>
          <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{plant}</span>
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
            <div className="circle">{latest.temperature}</div>
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
      {/* <div className={"addPlant"}>
      <Link to="/addNewPlant"><img src={addPlantIcon}/></Link>
    </div> */}
    </>)
}
