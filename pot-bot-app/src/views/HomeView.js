import {Link} from "react-router-dom";
import {useAuth} from "../firebaseModel";
import React from "react";
import "firebase/database";
import '../styling/homeView.css';
import PlantPresenter from "../presenters/PlantPresenter";
/*TODO: bestämma layout så alla är med på samma logik */
export default function HomeView() {
  const {user, logOut} = useAuth();

  return (
    <div className="Home">
      {user && <PlantPresenter/>}
      {user && <LogoutBtn/>}
      {!user && <Login/>}
    </div>
  );

  function Login() {
    return (
      <>
        <h2>To access this page you have to login</h2>
        <Link to="/">Back to login</Link>
      </>)
  }

  function LogoutBtn() {
    return (
      <div className="logout">
        <Link to="/">
          <button className="logout-btn" onClick={logOut}>Logout</button>
        </Link>
      </div>
    )
  }

}
