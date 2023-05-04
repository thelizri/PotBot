import {Link} from "react-router-dom";
import React from "react";
import "firebase/database";
import {Line} from 'react-chartjs-2';

export default function HistoryView({name, data}) {

  const options = {
    responsive: true,
    plugins: {
      legend: { //These are only needed if we have several datasets in one graph
        position: 'top',
        display: true, //this hides the legend
      },
      title: {
        display: true,
        text: `Your ${name} values over time`,
      },
    },
  };
  return (
    <div>
      <h2>Measurement history for Parasollpilea</h2>
      <div className="moisture-graph">
        {Object.keys(data).length > 0 && <Line options={options} data={data}/>}
      </div>
      <div className="uv-graph"></div>
      <div className="temperature-graph"></div>
      <Link to="/home">Back</Link>
    </div>
  )
}
