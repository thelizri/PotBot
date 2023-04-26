import {Link } from "react-router-dom";
import {useAuth} from "../firebaseModel";
import { useState } from "react";
import React from "react";
import '../styling/homeView.css';

export default function Home() {
    const {user, logOut} = useAuth();
    
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
        return (
            <>
            <div className="welcome">
                <h2>Welcome {user.email}</h2>
            </div>
            </>
        )
    }
    function LogoutBtn(){
        return(
            <div className="logout">
                <button to="/" onClick={logOut}>Log out</button>
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
                <img src="pot-bot-app/src/styling/images/elefantora.jpg" alt="plant1" width="100" height="100"></img>
            </div>
        )
    }
}