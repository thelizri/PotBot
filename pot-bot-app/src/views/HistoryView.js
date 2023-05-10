import {Link} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React from "react";
import "firebase/database";
import { Line } from 'react-chartjs-2';

export default function HistoryView({soilMoistureData, uvData, temperatureData}) {

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: { //These are only needed if we have several datasets in one graph
          position: 'top',
          display: false, //this hides the legend
        },
        title: {
          display: true,
          // text: 'Your plants soil moisture values over time',
        },
      },
    };

    return (
        <div className="graphs">
            <h2>Measurement history for {}</h2>
            <p>Your plants soil moisture values over time</p>
            <div className="moisture-graph">
                {Object.keys(soilMoistureData).length > 0 && <Line options={options} data={soilMoistureData} />}
            </div>
            <p>Your plants exposure to sunlight over time</p>
            <div className="uv-graph">
              {Object.keys(uvData).length > 0 && <Line options={options} data={uvData} />}
            </div>
            <p>Your plants temperature exposure over time</p>
            <div className="temperature-graph">
              {Object.keys(temperatureData).length > 0 && <Line options={options} data={temperatureData} />}
            </div>
            <Link to="/home">Back</Link>
        </div>
    )
}