import {Link } from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React from "react";
export default function Home() {
    const {user, logOut} = useAuth();
    //console.log(user);
    return (
        <div className="Home">
            {user && <Welcome/> }
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
                <h1>Welcome {user.email}</h1><Link to="/"><h2><button onClick={logOut}>Logout</button></h2></Link>
            </>
        )
    }
}