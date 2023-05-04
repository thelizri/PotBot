import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import HistoryView from "../views/HistoryView";

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


export default function HistoryPresenter() {
  let {state} = useLocation();
  const [graphData, setGraphData] = useState({})
  useEffect(() => {
    function makeGraph(state) {
      return {
        labels: [],
        datasets: [
          {
            label: `Soil-moisture (%)`,
            data: state,
            parsing: {
              yAxisKey: 'soilMoisture',
              xAxisKey: 'dateTime'
            },
            //data: labels.map((value, index) => soil.at(index)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'UV light mJ/cm2',
            data: state,
            parsing: {
              yAxisKey: 'uvIntensity',
              xAxisKey: 'dateTime'
            },
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
          {
            label: `Temperature \xB0C`,
            data: state,
            parsing: {
              yAxisKey: 'temperature',
              xAxisKey: 'dateTime'
            },
            borderColor: 'rgb(53, 162, 150)',
            backgroundColor: 'rgba(53, 162, 150, 0.5)',
          },
        ],
      };
    }

    /**const dateTimeArray = Object.keys(state.data).map(x => state.data[x].dateTime)
     * const timeArray = dateTimeArray.map(dateTime => dateTime.split(' ')[1]);
     * const soilMois = Object.keys(state.data).map(x => state.data[x].soilMoisture)
     * const name = state.name //Unsure how to get the name since it is a level above the data object*/
    const all = Object.keys(state.data).map(x => state.data[x])
    setGraphData(makeGraph(all))
  }, [state])
  return (
    <HistoryView data={graphData} name={state.name}/>
  )
}
