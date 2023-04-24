import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React from "react";
import {addNewPlant, readUserData, uploadPlantData} from "../databaseFunctions";
import PlantPresenter from "../presenters/PlantPresenter";
export default function Home() {
    const {user, logOut, updateProfileName} = useAuth();
    const userName = user.displayName;
    const navigate = useNavigate()
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
        function handlePlantClick(){
            navigate("/home/plants")
        }
        return (
            <>
                <h1>Welcome {userName}</h1>
                {/*this button could be changed to just circle trough all plants instead*/}
                <button onClick={handlePlantClick}>Plants</button>
                    <h1><button onClick={changeUserName}>Change User name</button></h1>
        <Link to="/"><h2><button onClick={logOut}>Logout</button></h2></Link>
            </>
        )
    }
    async function changeUserName(){
        let win = await window.open("/name", "_blank", "toolbar=no, resizable=no, height:100, width:200");
    }
    async function plantHandler(){
        try {
            await uploadPlantData(user, "/plants/test2/measureData",{m1:{time: 12, temp: 22, waterlevel: 50}});
            //const data = await addNewPlant(user, "/plants", "test2");

        }catch (e){
            console.error(e.message)
        }
    }
}