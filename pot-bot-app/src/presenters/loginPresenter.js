/* UseState over here */

import React from 'react';
import LoginView from "../views/loginView";
import {useAuth} from "../firebaseModel";
import {useNavigate } from "react-router-dom";
import HomePresenter from "./HomePresenter";
/*Todo: set url to /home if user already logged in
*/
function LoginPresenter() {
    const {user} = useAuth();
    let navigate = useNavigate("/home");

    return (
        <>
            {!user && <LoginView/>}
            {user && <HomePresenter/>}

        </>
    );
}

export default LoginPresenter;