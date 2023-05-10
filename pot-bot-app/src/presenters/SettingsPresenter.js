import React, {useEffect, useState} from "react";
import { useLocation, useParams } from 'react-router-dom';
import SettingsView from "../views/SettingsView";
import {setWateringPreference, notificationToggle, useAuth} from "../firebaseModel";

function SettingsPresenter() {
    let {plantName} = useParams();
    const {user} = useAuth();
    
    const handleNotificationToggle = async (event) => {
        const toggleValue = event.target.checked;
        await notificationToggle(user, toggleValue);
      };

  return (
    <SettingsView plantName={plantName} user={user} handleNotificationToggle={handleNotificationToggle} setWateringPreference={setWateringPreference}/>
  );
}

export default SettingsPresenter;
