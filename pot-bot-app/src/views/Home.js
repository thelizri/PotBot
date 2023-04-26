import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import { useState } from "react";
import React from "react";
import '../styling/homeView.css';

export default function Home() {
    const {user, logOut, updateProfileName} = useAuth();
    const userName = user.displayName;
    const navigate = useNavigate()
    //console.log(user);
    return (
        <div className="Home">
            {user && <Welcome/>}
            {user && <Plants/>}
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
    function Plants(){
        const [expanded, setExpanded] = useState(false);

        function handleClick() {
            setExpanded(!expanded);
        }
        return(
            <div className={`expandable-div ${expanded ? "expanded" : ""}`} onClick={handleClick}>
                <div className="card-title">
                    <img src="pot-bot-app/src/styling/images/elefant.jpg" width="100" height="100"/>
                    <p>Pilea Peperomioides</p>
                </div>
            </div>
        )
    }
                
}