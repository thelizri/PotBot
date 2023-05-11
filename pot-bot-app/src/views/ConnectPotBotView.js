import React from "react";

export default function ConnectPotBotView(plantName) {
  console.log(plantName)
  return (
    <div className="connect">

      <form className="connect">
        <p>Enter your device number</p>
        <input name='connect'/>
        <button name='connect' type='submit'>Connect</button>
      </form>
    </div>
  )
}
