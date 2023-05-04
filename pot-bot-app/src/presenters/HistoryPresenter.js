import React,{ useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import HistoryView from "../views/HistoryView";
import {faker} from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
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


export default function HistoryPresenter(){
    let {state} = useLocation();
    const [graphData, setGraphData] = useState({})
    const [plantName, setPlantName] = useState(null); //Ideally the plant name should be fetched as well
    /* const data = state?.data; //must use data?.{name} to access 
    console.log(state.soilMoisture); 
    */
    useEffect(() => {
        function makeGraph(y){
            const labels = timeArray;
              
            const data = {
            labels,
            datasets: [
                {
                label: 'SoilMoisture',
                data: labels.map(() => y),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                // {
                // label: 'UV light',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                // borderColor: 'rgb(53, 162, 235)',
                // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // },
                // {
                // label: 'Temperature',
                // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                // borderColor: 'rgb(53, 162, 235)',
                // backgroundColor: 'rgba(53, 162, 235, 0.5)',
                // },
            ],
            }
            return data;
        }
        const dateTimeArray = Object.keys(state).map(x => state[x].dateTime)
        const timeArray = dateTimeArray.map(dateTime => dateTime.split(' ')[1]);
        const soilMois = Object.keys(state).map(x => state[x].soilMoisture)
        //const name = "" //Unsure how to get the name since it is a level above the data object
        setGraphData(makeGraph(soilMois))
        /* console.log(Object.keys(state).map(x => state[x])) Gives the entire object*/
        console.log(dateTimeArray)
        console.log(timeArray)
        console.log(soilMois)
    },[state])

    return (
        <HistoryView data={graphData}/>
    )
}