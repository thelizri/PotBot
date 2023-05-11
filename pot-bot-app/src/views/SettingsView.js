import React from "react";
import "../styling/Settings.css";
import "../styling/dropdown.css"
import arrow from "../styling/images/dropdown-arrow.svg"

function SettingsView({plantName, handleNotificationToggle, setWateringPreference}) {

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
      <label className="dropbtn">Enable automatic watering </label><img width="24px" src={arrow}></img>
        </div>
        <div className="dropdown-content">
          <div id="Manual" onClick={(event) => setWateringPreference(event, plantName)}>Manual</div>
          <div id="Automatic" onClick={(event) => setWateringPreference(event, plantName)}>Automatic</div>
          <div id="frequent" onClick={(event) => setWateringPreference(event, plantName)}>Scheduled</div>
        </div>

      </div>
    </div>
  );
}
export default SettingsView;
