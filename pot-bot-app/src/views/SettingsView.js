import React from "react";
import "../styling/Settings.css";
import {notificationToggle, useAuth} from '../firebaseModel';

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
    </div>
  );
}
export default SettingsView;
