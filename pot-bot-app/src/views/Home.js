import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React from "react";
import "firebase/database";
import '../styling/homeView.css';
import PlantPresenter from "../presenters/PlantPresenter";
/*TODO: bestämma layout så alla är med på samma logik */
export default function Home() {
  const {user, logOut} = useAuth();
  const userName = user.displayName;
  const navigate = useNavigate()

  return (
    <div className="Home">
      {user && <Welcome/>}
      {user && <PlantPresenter/>}
      {user && <LogoutBtn/>}
      {!user && <Login/>}
    </div>
  );

  function Login() {
    return (
      <>
        <h1>To access this page you have to login</h1> <Link to="/"><h2>Back to login</h2></Link>
      </>)
  }

  function Welcome() {
    async function changeUserName() {
      await window.open("/name", "_blank", "toolbar=no, resizable=no, height:100, width:200");
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
              <Link to="/"><button className="logout-btn" onClick={logOut}>Logout</button></Link>
            </div>
        )
    }

}
