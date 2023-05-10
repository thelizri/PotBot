import React, { useState, useEffect } from "react";
import Settings from "../styling/Settings.css";
import { notificationToggle, useAuth } from '../firebaseModel';
import "../styling/dropdown.css"
import arrow from "../styling/images/dropdown-arrow.svg"

function SettingsView() {
    const {user} = useAuth();

    const handleNotificationToggle = async (event) => {
        const toggleValue = event.target.checked;
        await notificationToggle(user, toggleValue);
      };
      
      
  return (
    <div className="settings">
      <h2>Settings</h2>
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
          <div onClick={}>Manual</div>
          <div onClick={}>Automatic</div>
          <div onClick={}>Scheduled</div>
        </div>
  
      </div>
    </div>
  );
}
export default SettingsView;