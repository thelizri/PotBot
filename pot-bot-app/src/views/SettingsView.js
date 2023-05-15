import React from "react";
import {Link} from 'react-router-dom';
import "../styling/Settings.css";
import "../styling/dropdown.css"

function SettingsView({
                        plantName,
                        handleNotificationToggle,
                        setWateringPreference,
                        wateringType,
                        setInterval,
                        interval, intervalText
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
        <label htmlFor="watering-options" className="notifications">Chose what watering you want</label>
        <select id="watering-options" onChange={(event) => setWateringPreference(event.target.value)}>
          <option value="Choose an option">{wateringType}</option>
          <option value="Manual">Manual</option>
          <option value="Automatic">Automatic</option>
          <option value="Scheduled">Scheduled</option>
        </select>
        {wateringType === "Scheduled" && (
          <select onChange={(event) => setInterval(event.target.value)} className="interval">
            <option id={intervalText} value={interval}>{intervalText}</option>
            <option id="four-days" value={96}>4 days</option>
            <option id="one-week" value={168}>1 week</option>
              <option id="two-week" value={336}>2 weeks</option>

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
