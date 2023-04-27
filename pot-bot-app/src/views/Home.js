import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import { useState, useEffect } from "react";
import React from "react";
import {get, getDatabase, onValue, ref} from "firebase/database";
import "firebase/database";
import '../styling/homeView.css';
import elefant from '../styling/images/elefant.jpg'

export default function Home() {
    const {user, logOut, updateProfileName} = useAuth();
    const userName = user.displayName;
    const navigate = useNavigate()
    
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
        const [plant, setPlant] = useState({});
        useEffect(() => {
            const db = getDatabase();
            const plantRef = ref(db, 'SensorData/raspberry-1/-NTxnhQiZqz3-ETWTALT');
            get(plantRef).then((data) => setPlant(data.val()) )
            // onValue(soilMoistureRef, (snapshot) => {
            //     const data = snapshot.val();
            //     setSoilMoisture(data);
            //     console.log(data)
            // })
        }, []);

        function handleClick() {
            setExpanded(!expanded);
        }
        return(
            <div>
                <div className={`expandable-div ${expanded ? "expanded" : ""}`} onClick={handleClick}>
                    <div className="card-title">
                        <img src={elefant} width="100" height="100"/>
                        <p>{props.title}</p>
                    </div>
                    {expanded && <div className="plant-data soil-moisture temperature uv-light">
                                    <div>Moisture: {plant.soil_moisture} </div>
                                    <div>Light: {plant.uv_light}</div>
                                    <div>Temperature: {plant.temperature}</div>
                                </div>}
                </div>
            </div>
            
        )
    }
                
}
