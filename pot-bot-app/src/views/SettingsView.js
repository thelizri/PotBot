import React, {useState} from "react";
import "../styling/Settings.css";
import "../styling/dropdown.css"
import arrow from "../styling/images/dropdown-arrow.svg"

function SettingsView({plantName, handleNotificationToggle, setWateringPreference, wateringType, setInterval, interval}) { 
  // const [selectedOption, setSelectedOption] = useState("Choose watering method");
  
  // function setWateringPreference(event, plantName) {
  //   const selected = event.target.id;
  //   setSelectedOption(selected);
  //   // call function to set watering preference here
  // } 
  // function handleIntervalChange(event) {
  //   const selectedInterval = event.target.id;
  //   setInterval(selectedInterval);
  // }
    
  return (
    <div className="settings">
      <h2>Settings for {plantName}</h2>
      <div className={"row"}>
        <label htmlFor="notificationToggle">Receive notifications</label>
        <input
          type="checkbox"
          id="notificationToggle"
          onChange={handleNotificationToggle}
        />
      </div>
      <div className="dropdown">
      <div className="row dropbtn">
        <label className="dropbtn">{"Chosen watering: " + wateringType}</label><img width="24px" src={arrow}></img>
      </div>
        <div className="dropdown-content">
          <div id="Manual" onClick={(event) => setWateringPreference(event, plantName)}>Manual</div>
          <div id="Automatic" onClick={(event) => setWateringPreference(event, plantName)}>Automatic</div>
          <div id="Scheduled" onClick={(event) => setWateringPreference(event, plantName)}>Scheduled</div>
        </div>
      </div>
      {wateringType === "Scheduled" && (
        <form onChange={(event) => setInterval(event.target.value)} className="interval">
          <input type="radio" id="four-days" value={96} name="schedule" defaultChecked={interval && interval == 96 ? "true": "false"}></input>
          <label htmlFor="four-days">4 days</label><br></br>
          <input type="radio" id="one-week" value={168} name="schedule" defaultChecked={interval && interval == 168 ? "true": "false"}></input>
          <label htmlFor="one-week">1 week</label><br></br>
          <input type="radio" id="two-week" value={336} name="schedule" defaultChecked={interval && interval == 336 ? "true": "false"}></input>
          <label htmlFor="two-week">2 weeks</label><br></br>
        </form>
          )}
    </div>
  );
}
export default SettingsView;
