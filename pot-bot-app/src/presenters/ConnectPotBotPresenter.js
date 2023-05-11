import React from "react";
import {useAuth} from "../firebaseModel";
import ConnectPotBotView from "../views/ConnectPotBotView";
import {useLocation} from "react-router-dom";

export default function ConnectPotBotPresenter() {
  const {user} = useAuth()
  let {state} = useLocation()
  console.log(state.plantName)

  function connectPotBot(productID, plantName) {

  }

  return (
    <ConnectPotBotView/>
  )

}
