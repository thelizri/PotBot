import {useEffect, useState} from "react";
import {get, getDatabase, ref} from "firebase/database";
import elephant from '../styling/images/elefant.jpg'
import addPlantIcon from '../styling/images/plus-pot.png'
import {useAuth} from '../firebaseModel'

function Plants({title}) {

  const [expanded, setExpanded] = useState(false);
  const [plantObjects, setPlantObjects] = useState([]);
  const [recentData, setRecentData] = useState({})
  const {user} = useAuth();

  useEffect(() => {
    const db = getDatabase();
    const plantRef = ref(db, `users/${user.uid}/plants`);
    get(plantRef).then((data) => {
      const plantObjects = Object.values(data.val())
      setPlantObjects(plantObjects)

      const measureData = plantObjects[0].measureData
      const mostRecentData = Object.values(Object.values(measureData)[0])[0]

      setRecentData(mostRecentData)

    })
  }, [user]);


  function handleClick() {
    setExpanded(!expanded);
  }


  return (
    <>
      <div className={`expandable-div ${expanded ? "expanded" : ""}`}
           onClick={handleClick}>
        <div className="card-title">
          <img src={elephant} width="100" height="100"/>
          <span style={{fontFamily: "sans-serif", padding: "0.5em"}}>{title}</span>
        </div>
        {expanded && <div className="plant-data soil-moisture temperature uv-light">
          <div>Moisture: {recentData.soilMoisture}</div>
          <div>Light: {recentData.uvIntensity}</div>
          <div>Temperature: {recentData.temperature}</div>
        </div>}
      </div>
      <div className={"addPlant"}>
        <img src={addPlantIcon}/>
      </div>
    </>)
}

export default Plants;
