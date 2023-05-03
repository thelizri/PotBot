import {hasPlants, readUserData, useAuth} from "../firebaseModel";
import React, {useEffect, useState} from "react";
import PlantView from "../views/PlantView";
import {Link, useNavigate} from "react-router-dom";
import elephant from "../styling/images/elefant.jpg";

export default function PlantPresenter() {
  const navigate = useNavigate();
  const [plants, setPlants] = useState(null);
  const {user} = useAuth();

  useEffect(() => {
    if (plants === null) {
      readUserData(user, "plants").then((data => {
        setPlants(data)
      })).catch(err => console.error(err));
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
                parseInt(x)).reduce((a,b) => Math.max(a,b))
      setLatest(data[latestDate])
    }, [user, data])
    console.log(latest)

    return (
      <>
        <div className={`expandable-div ${expanded ? "expanded" : ""}`}
             onClick={handleClick}>
          <div className="card-title">
            <img src={elephant} width="100" height="100"/>
            <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{name}</span>
          </div>
          <div className="plant-data">
            <div className="row">
              <div className="col">
                <div className="circle">{"dummy"/*latest.soilMoisture*/} </div>
                <p>Moisture</p>
              </div>
              <div className="col">
                <div className="circle">{"dummy"}</div>
                <p>Light</p>
              </div>
              <div className="col">
                <div className="circle">{"dummy"}</div>
                <p>Temperature</p>
              </div>
              <div className="col">
                <div className="circle">{"dummy"}</div>
                <p>Waterlevel</p>
              </div>
            </div>
            <div className="row">
              <div className="stats-btn"><Link to="/stats">See growth history</Link></div>
            </div>
          </div>
        </div>
      </>)

  }

  return <div>
    {<PlantView user={user} plants={plants} Plant={Plant}/>}
  </div>

  /**
   * DummieButton to add a new plant*/
  function buttonHandler() {
    navigate("/addPlant")
    //addNewPlant(user, "plants", "Elefant-ear" ).catch(error => {console.error(error)})
  }
}
