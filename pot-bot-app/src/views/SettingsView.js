import React, { useState, useEffect } from "react";
import "../styling/Settings.css";
import "../styling/dropdown.css"
import arrow from "../styling/images/dropdown-arrow.svg"

function SettingsView({user, plantName, handleNotificationToggle, setWateringPreference}) { 
  const [selectedOption, setSelectedOption] = useState("Choose watering method");
  const [interval, setInterval] = useState("");

  function setWateringPreference(event, plantName) {
    const selected = event.target.id;
    setSelectedOption(selected);
    // call function to set watering preference here
  } 
  function handleIntervalChange(event) {
    const selectedInterval = event.target.id;
    setInterval(selectedInterval);
  }
    
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
        <button className="dropbtn">{"Chosen watering: " + selectedOption}</button><img width="24px" src={arrow}></img>
      </div>
        <div className="dropdown-content">
          <div id="Manual" onClick={(event) => setWateringPreference(event, plantName)}>Manual</div>
          <div id="Automatic" onClick={(event) => setWateringPreference(event, plantName)}>Automatic</div>
          <div id="frequent" onClick={(event) => setWateringPreference(event, plantName)}>Scheduled</div>
        </div>
      </div>
      {selectedOption === "frequent" && (
        <div className="interval">
          <input type="radio" id="one-week"></input>
          <label for="one-week">1 week</label><br></br>
        </div>
          )}
    </div>
  );
}
export default SettingsView;
