import React, { useState, useEffect } from "react";
import Settings from "../styling/Settings.css";
import { notificationToggle, useAuth } from '../firebaseModel';

function SettingsView() {
    const {user} = useAuth();

    const handleNotificationToggle = async (event) => {
        const toggleValue = event.target.checked;
        await notificationToggle(user, toggleValue);
      };
      
      
  return (
    <div className="settings">
      <h1>Settings</h1>
      <label htmlFor="notificationToggle">Receive notifications</label>
      <input
        type="checkbox"
        id="notificationToggle"
        onChange={handleNotificationToggle}
      />
      <label htmlFor="automaticWateringToggle">Enable automatic watering</label>
      <input
        type="checkbox"
        id="automaticWateringToggle"
        // onChange={handleNotificationToggle}
      />
    </div>
  );
}
export default SettingsView;