import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom';
import SettingsView from "../views/SettingsView";
import {notificationToggle, readUserData, setWateringPreference, updatePlantData, useAuth} from "../firebaseModel";

function SettingsPresenter() {
  let {plantName} = useParams();
  const {user} = useAuth();
  const [wateringType, setWateringType] = useState(" ");
  const [interval, setInterval] = useState();

  const handleNotificationToggle = async (event) => {
    const toggleValue = event.target.checked;
    await notificationToggle(user, toggleValue);
  };

  useEffect(() => {
    const path = `plants/${plantName}/settings/type`
    readUserData(user, path).then(setWateringType)
  }, [user])

  useEffect(() => {
    if (!interval) return;
    const path = `plants/${plantName}/settings/`
    updatePlantData(user, path, {frequency: interval})
  }, [interval, user])


  return (
    <SettingsView interval={interval} setInterval={setInterval} wateringType={wateringType} plantName={plantName}
                  user={user} handleNotificationToggle={handleNotificationToggle}
                  setWateringPreference={setWateringPreference}/>
  );
}

export default SettingsPresenter;
