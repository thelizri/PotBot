import React from "react";

export default function PlantView({plants, Plants}) {

  return (
    <div>
      <h1>Your plants</h1>
      <ul>
        {/*plants && Object.keys(plants).map(x => <li key={x}>{x}</li>)*/}
      </ul>
      {plants &&  <Plants/>}
    </div>
  )
}
