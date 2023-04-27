import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import { useState, useEffect } from "react";
import React from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import "firebase/database";
import '../styling/homeView.css';

export default function Home() {
    const {user, logOut, updateProfileName} = useAuth();
    const userName = user.displayName;
    const navigate = useNavigate()
    
    // const db = getDatabase();   //fetch database
    // const moisture = ref(db, 'SensorData/raspberry-1/-NTxnhQiZqz3-ETWTALT/soil_moisture');
    // const dataElement = document.querySelector('.soil-moisture');
    // onValue(moisture, (snapshot) => {
    //     const data = snapshot.val();
    //     displaySoilMoisture(dataElement, data);
    // });

    // function displaySoilMoisture(dataElement, moisture){
    //     //find element in the ui that displays the soil moisture 
    //     const moistureElement = dataElement.querySelector('.soil-moisture');
    //     moistureElement.textContent = moisture.toString();
    // }
    
    // const [data, setData] = useState({});
    // useEffect(() => {
    //     const fetchData = (snapshot) => {
    //       setData(snapshot.val());
    //     };
    
    //     database.ref().on("value", fetchData);
    
    //     return () => {
    //       database.ref().off("value", fetchData);
    //     };
    //   }, []);
    
    return (
        <div className="Home">
            {user && <Welcome/>}
            {user && <Plants title="Parasollpilea"/>}
            {user && <LogoutBtn/>}
            {!user && <Login/>}
        </div>
    );
    function Login(){
        return (
            <>
                <h1>To access this page you have to login</h1> <Link to="/"><h2>Back to login</h2></Link>
            </>)
    }
    function Welcome(){
        function handlePlantClick(){
            navigate("/home/plants")
        }
        async function changeUserName(){
            let win = await window.open("/name", "_blank", "toolbar=no, resizable=no, height:100, width:200");
        }
        return (
            <>
                <h2>Welcome {userName}</h2>
                {/*this button could be changed to just circle trough all plants instead*/}
                {/* <button onClick={handlePlantClick}>Plants</button> */}
                <button className="change-username" onClick={changeUserName}>Change User name</button>
                {/* <Link to="/"><h2><button onClick={logOut}>Logout</button></h2></Link> */}
            </>
        )
    }
    
    function LogoutBtn(){
        return(
            <div className="logout">
                <button className="logout-btn" to="/" onClick={logOut}>Log out</button>
            </div>
        )
    }
    function Plants(props){
        const [expanded, setExpanded] = useState(false);
        const [soilMoisture, setSoilMoisture] = useState(0);
        useEffect(() => {
            const db = getDatabase();
            const soilMoistureRef = ref(db, 'SensorData/raspberry-1/' + props.plantID + '/soil_moisture');
            onValue(soilMoistureRef, (snapshot) => {
                const data = snapshot.val();
                setSoilMoisture(data);
            })
        }, [props.plantID]);

        function handleClick() {
            setExpanded(!expanded);
        }
        return(
            <div>
                <div className={`expandable-div ${expanded ? "expanded" : ""}`} onClick={handleClick}>
                    <div className="card-title">
                        <img src="pot-bot-app/src/styling/images/elefant.jpg" width="100" height="100"/>
                        <p>{props.title}</p>
                    </div>
                    {expanded && <div className="plant-data soil-moisture temperature uv-light">
                                    <div>Moisture: {soilMoisture} </div>
                                    <div>Light:</div>
                                    <div>Temperature:</div>
                                </div>}
                </div>
            </div>
            
        )
    }
                
}