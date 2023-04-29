import React from "react";

export default function PlantView({plants, Plants}) {

  return (
    <div>
      <h2>Your plants</h2>
      <ul>
        {/*plants && Object.keys(plants).map(x => <li key={x}>{x}</li>)*/}
      </ul>
      {plants &&  <Plants/>}
    </div>
  )
}
