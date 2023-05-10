import React, { useState, useEffect } from "react";
import "../styling/Settings.css";
import "../styling/dropdown.css"
import arrow from "../styling/images/dropdown-arrow.svg"

function SettingsView({user, plantName, handleNotificationToggle, setWateringPreference}) {  
    
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
      {/* <label htmlFor="automaticWateringToggle">Enable automatic watering</label> */}
      <div className="row dropbtn">
      <button className="dropbtn">Enable automatic watering </button><img width="24px" src={arrow}></img>
        </div>
        <div className="dropdown-content">
          <div id="Manual" onClick={(event) => setWateringPreference(event, plantName)}>Manual</div>
          <div id="Automatic" onClick={() => setWateringPreference(plantName, this.id)}>Automatic</div>
          <div id="frequent" onClick={() => setWateringPreference(plantName, this.id)}>Scheduled</div>
        </div>
  
      </div>
    </div>
  );
}
export default SettingsView;