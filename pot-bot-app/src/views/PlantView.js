import React from "react";

export default function PlantView({plants}) {
  return (
    <div>
      <h1>Your plants</h1>
      <ul>
        {plants && Object.keys(plants).map(x => <li key={x}>{x}</li>)}
      </ul>
    </div>
  )
}
