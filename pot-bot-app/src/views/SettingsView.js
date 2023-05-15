import React from "react";
import {Link, useLocation} from 'react-router-dom';
import "../styling/Settings.css";
import "../styling/dropdown.css"

function SettingsView({
                        plantName,
                        handleNotificationToggle,
                        setWateringPreference,
                        wateringType,
                        setInterval,
                        interval
                      }) {
  return (
    <div className="settings">
      <h2>Settings for {plantName}</h2>
      <div className={"row"}>
        <label htmlFor="notificationToggle" className="notifications">Receive notifications</label>
        <input
          type="checkbox"
          id="notificationToggle"
          onChange={handleNotificationToggle}
        />
      </div>
      {/* Changed this into select-option tags instead, less code
      But still need to figure out how to display the interval selection right away*/}
      <div className="dropdown column">
        <label for="watering-options" className="notifications">Chose what watering you want</label>
        <select id="watering-options" onChange={(event) => setWateringPreference(event, plantName)}>
          <option value="Choose an option">{wateringType}</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Scheduled">Scheduled</option>
        </select>
        {wateringType === "Scheduled" && (
          <select onChange={(event) => setInterval(event.target.value)} className="interval">
            <optgroup label="Scheduled" id="Scheduled"
                      onChange={(event) => setWateringPreference(event, plantName)}>Scheduled
              <option id="four-days" value={96}>4 days</option>
              <option id="one-week" value={168}>1 week</option>
              <option id="two-week" value={336}>2 weeks</option>
            </optgroup>
          </select>
        )}
      </div>
      <Link to="/home" className="back-btn"> Back to your plants
        {/* <button className="back-btn">Back to your plants</button> */}
      </Link>
    </div>
  );
}

export default SettingsView;
